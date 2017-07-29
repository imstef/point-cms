import gc
from flask_mysqldb import MySQL
#files
from mbconf import *

# global variables
class DatabaseConnection:
	def __init__(self, app):
		self.app = app
		self.mysql = None
		self.cursor = None
		self.config()

	def config(self):
		# Config MySQL
		self.app.config['MYSQL_HOST'] = MYSQL_HOST
		self.app.config['MYSQL_USER'] = MYSQL_USER
		self.app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
		self.app.config['MYSQL_DB'] = MYSQL_DB
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

