
from flask import Flask, render_template, url_for
# files
from dbhandler import DatabaseConnection
from mbconf import *

app = Flask(__name__)

# config Database
connection = DatabaseConnection(app)

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

# global variables that cna be accessed from Jinja templates
app.jinja_env.globals.update(close=connection.close)
app.jinja_env.globals.update(execute_query=connection.execute_query)

if __name__ == "__main__":
	app.run(*RUN_ARGS)
