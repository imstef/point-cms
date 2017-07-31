
from flask import Flask, render_template, url_for, request, redirect
from passlib.hash import sha256_crypt
# files
from dbhandler import DatabaseConnection
from mbconf import *

app = Flask(__name__)

# config Database
connection = DatabaseConnection()

@app.route("/")
def homepage():
	# connect to database
	connection.connect()

	# query for getting all sections
	query = "SELECT * FROM section_list JOIN section_type USING (tid) ORDER BY position"

	# execute query and get result
	sections = connection.execute_query(query)

	return render_template('main.html.j2', sections=sections)

# end def

@app.route("/login/", methods=["GET", "POST"])
def login():
	if request.method == "POST":
		username = request.form["username"]
		password_candidate = request.form["password"]

		if username and password_candidate:
			connection.connect()
			result = connection.execute_query("SELECT * FROM users WHERE username = '{}'".format(username))
			connection.close()

			if len(result) == 1 and password_candidate == result[0]["password"]:
				return "Welcome!"
			else:
				return "Wrong username or password"

		else:
			return "Enter username and password"

	return render_template('login.html.j2')

# end def

# global variables that cna be accessed from Jinja templates
app.jinja_env.globals.update(close=connection.close)
app.jinja_env.globals.update(execute_query=connection.execute_query)
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

if __name__ == "__main__":
	app.run(*RUN_ARGS)
