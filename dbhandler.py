import gc
from flask_mysqldb import MySQL

# global variables
class DatabaseConnection:
	def __init__(self, app):
		self.app = app
		self.mysql = None
		self.cursor = None
		self.config()

	def config(self):
		# Config MySQL
		self.app.config['MYSQL_HOST'] = 'localhost'
		self.app.config['MYSQL_USER'] = 'root'
		self.app.config['MYSQL_PASSWORD'] = 'jupiter123'
		self.app.config['MYSQL_DB'] = 'moonbow'
		self.app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

		# init MySQL
		self.mysql = MySQL(self.app)
	# end def

	def connect(self):
		self.cursor = self.mysql.connection.cursor()
	# end def

	def execute_query(self, query):
		# execute query
		temp = self.cursor.execute(query)

		# convert to list of dictionaries
		result = self.cursor.fetchall()

		return result
	# end def

	# close database connection
	def close(self):
		self.cursor.close()
		gc.collect()
		return ""
	# end def

# end class

