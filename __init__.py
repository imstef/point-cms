
from flask import Flask, render_template, url_for, request, session, logging, redirect, flash, jsonify
from passlib.hash import sha256_crypt
from datetime import timedelta
from functools import wraps
from MySQLdb import escape_string as thwart
# files
from dbhandler import DatabaseConnection
from mbconf import *
from posthandler import *

app = Flask(__name__)
app.secret_key = 'secretkey'
app.debug = True

# config Database
connection = DatabaseConnection()

@app.before_request
def make_session_permanent():
	session.permanent = True
	app.permanent_session_lifetime = timedelta(minutes=120)

@app.route("/")
def homepage():
	# connect to database
	connection.connect()

	# query for getting all sections
	query = "SELECT * FROM section_list JOIN section_type USING (tid) ORDER BY position"

	# execute query and get result
	sections = connection.execute_query(query)

	return render_template('home-page.html.j2', sections=sections)

# end def

def is_logged_in(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
		else:
			#flash()
			return redirect(url_for('login'))
	return wrap
# end def

def is_logged_out(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' not in session:
			return f(*args, **kwargs)
		else:
			#flash()
			return redirect(url_for('dashboard'))
	return wrap
# end def

@app.route("/login/", methods=["GET", "POST"])
@is_logged_out
def login():
	connection.connect()
	message = ""
	if request.method == "POST":
		username = request.form["username"]
		password_candidate = request.form["password"]
		connection.connect()
		if username and password_candidate:
			result = connection.execute_query("SELECT * FROM users WHERE username = '{}'".format(thwart(username)))
			password_match = sha256_crypt.verify(password_candidate, result[0]["password"])
			if len(result) == 1 and password_match:
				connection.close()
				session["logged_in"] = True
				session["username"] = username
				return redirect(url_for('dashboard'))
			else:
				message = "Wrong username or password"
				flash(message)
				return render_template("login-page.html.j2")
		else:
			message = "Enter username and password"
			flash(message)
			return render_template("login-page.html.j2")

	return render_template('login-page.html.j2')
# end def

@app.route("/dashboard/")
@is_logged_in
def dashboard():
	connection.connect()
	# query for getting all sections
	query = "SELECT * FROM section_list JOIN section_type USING (tid) ORDER BY position"
	# execute query and get result
	sections = connection.execute_query(query)
	return render_template("dashboard-page.html.j2", sections=sections)
# end def

@app.route("/logout/")
@is_logged_in
def logout():
	session.clear()
	return redirect(url_for('homepage'))
# end def

@app.route("/api/", methods=["GET", "POST"])
def api():
	data = request.form.getlist('data[]')
	form_id = request.form.get('form_id')
	connection.connect()
	query = update_database(connection, str(form_id), data)
	connection.execute_query(query)
	connection.execute_query("commit")
	connection.close()
	return jsonify(query)

# global variables that can be accessed from Jinja templates
app.jinja_env.globals.update(connect=connection.connect)
app.jinja_env.globals.update(execute_query=connection.execute_query)
app.jinja_env.globals.update(close=connection.close)
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

if __name__ == "__main__":
	app.run(host="0.0.0.0")
