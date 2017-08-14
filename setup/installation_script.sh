#!/bin/bash

app_name="$1"
domain="$2"
contact="$3"

if [[ $app_name == "" || $domain == "" || $contact == "3" ]]; then
	echo "Enter app name, domain and contact!"
	exit 1
fi

(apt-get update)
(apt-get --assume-yes install apache2)

(apt-get --assume-yes install php libapache2-mod-php php-mcrypt php-mysql)

(apt-get --assume-yes install software-properties-common)
(apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8)
(add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://www.ftp.saix.net/DB/mariadb/repo/10.1/ubuntu xenial main')
(apt-get update)
(apt-get --assume-yes install mariadb-server)
(apt-get --assume-yes install mariadb-client)
(systemctl start mariadb)
(systemctl enable mariadb)
(mysql_secure_installation)

(apt-get --assume-yes install phpmyadmin)

(apt-get --assume-yes install libapache2-mod-wsgi python-dev)
(a2enmod wsgi)
path="/var/www/$app_name"
(mkdir "$path")
path="$path/$app_name"
(mkdir "$path")
(mkdir "$path"/static)
(mkdir "$path"/templates)
(rm "$path"/__init__.py 2> /dev/null)
(touch "$path"/__init__.py)
echo "from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
    return 'Works!'
if __name__ == '__main__':
    app.run()" | tee "$path"/__init__.py 2> /dev/null

(apt-get --assume-yes install python-pip)
(sudo -H pip install virtualenv)
(virtualenv venv)
(source venv/bin/activate)
(pip install Flask)
(python "$path"/__init__.py)
(deactivate)

path="/etc/apache2/sites-available/"$app_name".conf"
(rm $path 2> /dev/null)
(touch $path)
echo "<VirtualHost *:80>
		ServerName $domain
		ServerAdmin $contact
		WSGIScriptAlias / /var/www/$app_name/$app_name.wsgi
		<Directory /var/www/$app_name/$app_name/>
			Order allow,deny
			Allow from all
		</Directory>
		Alias /static /var/www/$app_name/$app_name/static
		<Directory /var/www/$app_name/$app_name/static/>
			Order allow,deny
			Allow from all
		</Directory>
		ErrorLog ${APACHE_LOG_DIR}/error.log
		LogLevel warn
		CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>" | tee "$path" 2> /dev/null

(a2ensite $app_name)
path="/var/www/$app_name/"$app_name".wsgi"
(rm $path 2> /dev/null)
(touch $path)

echo "#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,'/var/www/$app_name/')

from $app_name import app as application
application.secret_key = '$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)'" | tee "$path"

(pip install flask-mysqldb)
(mysql -u root -p -e ' DROP DATABASE IF EXISTS $app_name; CREATE DATABASE $app_name;')
(mysql -u root -p $app_name < ./moonbow.sql)
(apt-get install python-mysql)
(service --assume-yes apache2 restart)

echo "done"
exit 0