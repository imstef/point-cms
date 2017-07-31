import gc
import MySQLdb
import MySQLdb.cursors
# custom files
from mbconf import *

# global variables
class DatabaseConnection:
	def __init__(self):
		self.connection = None
		self.cursor = None
		self.config()

	def config(self):
		# Config MySQL
		self.connection = MySQLdb.connect(host=MYSQL_HOST,
						   user=MYSQL_USER, 
						   passwd=MYSQL_PASSWORD,
						   db=MYSQL_DB, 
						   cursorclass=MySQLdb.cursors.DictCursor)
	# end def

	def connect(self):
		self.cursor = self.connection.cursor()
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
		self.connection.close()
		gc.collect()
		return ""
	# end def

# end class

