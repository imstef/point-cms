from passlib.hash import sha256_crypt
import getpass
from dbhandler import DatabaseConnection

username = str(raw_input("Enter username: "))
password = getpass.getpass("Enter password:")

connection = DatabaseConnection()
connection.close()
