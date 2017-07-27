
from flask import Flask, render_template, url_for
import gc
# files
from dbhandler import DatabaseConnection

app = Flask(__name__)
# debug mode on
app.debug = True

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

	return render_template('main.html', sections=sections)

# end def

def get_data(type, arg):

	# query for calling procedure
	query = "CALL template_{}_procedure('{}')".format(type, arg)

	# execute query and get result
	data = connection.execute_query(query)

	return data

# end def

def close():
	# close database connection
	connection.close()
	gc.collect()
	return ""
# end def

# global variables that cna be accessed from Jinja templates
app.jinja_env.globals.update(get_data=get_data)
app.jinja_env.globals.update(close=close)


if __name__ == "__main__":
    app.run()
