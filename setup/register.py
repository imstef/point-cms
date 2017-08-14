from passlib.hash import sha256_crypt
import getpass
from dbhandler import DatabaseConnection
from MySQLdb import escape_string as thwart

username = str(raw_input("Enter username: "))
password = getpass.getpass("Enter password:")
password2 = getpass.getpass("Confirm password:")

if password != password2:
	print("Passwords do not match!")
	exit (2)

password = sha256_crypt.encrypt(password)
connection = DatabaseConnection()
connection.connect()

query = "SELECT * from users WHERE username = '{}'".format(thwart(username))
data = connection.execute_query(query)
if len(data) == 1:
	print("Users exists!")
	exit (1)

query = "INSERT INTO users (username, password) VALUES('{}', '{}')".format(thwart(username), thwart(password))
connection.execute_query(query)
connection.execute_query("commit")
connection.close()

print("Done!")