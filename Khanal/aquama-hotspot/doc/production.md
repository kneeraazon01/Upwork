# Production deployment of Aquama-hotspot #

This document is about production deployment of Aquama-hotspot.


## Architecture ##

The backend web app of Aquama-hotspot is written with the Django
framework. On the production serveur, the backend is run by Gunicorn
server. 

The static files (css, js, etc) and the media files (images, etc) are
provided by an Apache server who also acts as a revers proxy for
Gunicorn.

This Apache can be directly accessible by clients or it can be behind
another revers proxy (ex: HAproxy, Traefik, etc).


## Needed before starting ##

Before starting, you will need:
- A server with GNU/Linux
- Some knowledge of GNU/Linux administration


## Deployment ##

### User ###

First, crate a user account on the operating system.
This user will run Aquama-Hydro backend.


### Copy this project on server ###

You need to copy the source code of this project on the server you
want to deploy it. Put it on a folder that the user created at first
step can access to (read and write).


### System dependencies ###

Next, you need to install:
- `Python`: Version >= 3.7
- Python `setuptools` for Python 3: Version >= 40.8.0
- Python package manager `pip` for Python 3: Version >= 18.1
- `Apache` server: Version >= 2.4.38

If you deploy on an ARM architecture, you also need the headers files for:
- libjpeg
- zlib1g
- libfreetype6
- liblcms1

And, still for ARM architecture, the libraries:
- libopenjp2-7
- libtiff5


### Python dependencies ###

Then, you need to install Python pkgs needed by Aquama-Hotspot.

For that, you can simply run `pip` with the user created at first step:
``` sh
pip install --user -r requirements.txt
```

You also need to install `Gunicorn`:
``` sh
pip install --user gunicorn
```


### Configure Aquama-Hotspot ###

Now, you need to edit the file `aquama_hotspot_site/settings.py` to
configure Aquama-Hotspot.

Define a secret key with the variable `SECRET_KEY`. As it's name
suggest it, keep it secret.

Disable debug mode by setting the variable `DEBUG` to `False`.

Set the hostname used for this app as a string in the
list of the variable `ALLOWED_HOSTS`.

Set the variable `USE_X_FORWARDED_HOST` to `True`, so the app know the
hostname that the revers proxy manage.

Set the variable `SECURE_PROXY_SSL_HEADER` to the tuple
`('HTTP_X_FORWARDED_PROTO', 'https')`. So, the app can know if the
connexion between the client and the revers proxy is secure or not.

Set the variable `SECURE_SSL_REDIRECT` to `True`, so the app can
generate internal urls with the `https` scheme if the connexion
between the client and the revers proxy is secure.


### Create the database ###

Now you need to create the database. For now the database used is
sqlite and the database file is created at the root of this project.

Simply run this command on your server, from the root of
Aquama-Hotspot project, with the user created at first step:
``` sh
python3 manage.py migrate
```

A database file is created, as well as all the tables, columns,
relations, etc.


### Create super user for Aquama-hotspot ###

Aquama-Hotspot need an internal super user. This account is created on
Aquama-Hotspot and have all right.

To create this super-user, simply run this command on your server,
from the root of Aquama-Hotspot project, with the user created at
first step:
``` sh
python3 manage.py createsuperuser
```

Then reply to the questions asked.


### Load initial data ###

Aquama-Hotspot provide so inital data we need to load. These data are
called fixture by the Django project.

For now we only have one: `AquamaSolutionType_start.json`
It load type of solutions that an Aquama machine can produce.

To load these data, simply run this command on your server, from the
root of Aquama-Hotspot project, with the user created at first step:
``` sh
python3 manage.py loaddata AquamaSolutionType_start.json
```


### Static and media files ###

Now we will working on static and media files.

These files are stored the server file system by Aquama-Hotspot and
then distributed to clients by a webserver (here we use Apache).

First, create 2 directories that the user created at first step can
access to (read and write). One for static files, another for media
files.

Second, tell Aquama-hydro where these directories are. For that, edit
the file `aquama_hotspot_site/settings.py` of this project and set
these variables:
- `STATIC_ROOT`: The path to the static files folder, as a string
- `MEDIA_ROOT`: The path to the media files folder, as a string

Third, tell Aquama-hydro what path to use on URL to static and media
files. For that, edit the file `aquama_hotspot_site/settings.py` of
this project and set these variables:
- `STATIC_URL`: The url path to use to distribute the static files, as a string,
  generally `/static/`
- `MEDIA_URL`: The url path to distribute the media files, as a
  string, generally `/media/`

Fourth, request Aquama-Hydro to collect the static files and to put
them on the static files folder. To do that, simply run this command
on your server, from the root of Aquama-Hotspot project, with the user
created at first step:
``` sh
python3 manage.py collectstatic
```

For more informations about static files managment on Django apps:
https://docs.djangoproject.com/en/3.2/howto/static-files/

For more informations about static files deployment on Django apps:
https://docs.djangoproject.com/en/3.2/howto/static-files/deployment/


### Run Aquama-Hotspot as a service ###

Now that Aquama-Hotspot backend can run, we are going to use Systemd to manage it.

Simply create, on your server, a `.service` file at the path `/etc/systemd/system/aquama-hotspot.service`.
On this file, write this:
``` .service
[Unit]
Description= Aquama Hotspot service
After=network.target

[Service]
Type=notify
# the specific user that our service will run as
User={{ aquama_hotspot_user }}
Group={{ aquama_hotspot_user }}
WorkingDirectory={{ aquama_hotspot_code }}
ExecStart=/home/{{ aquama_hotspot_user }}/.local/bin/gunicorn aquama_hotspot_site.wsgi --bind 0.0.0.0:8000 --access-logfile - --error-logfile -
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Replace:
- `{{ aquama_hotspot_user }}` by the user name of the user created at first step.
- `{{ aquama_hotspot_code }}` by the path to the project source code root on the server

Ask SystemD to reload its configuration by running this command on your server, as `root`:
``` sh
systemctl daemon-reload
```

Then ask SystemD to start and enable `aquama-hotspot.service` unit by
running these commands on your server, as `root`:
``` sh
systemctl start aquama-hotspot.service
systemctl enable aquama-hotspot.service
```

See if Aquama-Hotspot have started correctry with this commande:
``` sh
systemctl status aquama-hotspot.service
```

### Configure Apache ###

Now we are gona configure Apache for 2 tasks:
- Be a revers proxy for Aquama-Hydro
- Distribute static and media files for Aquama-Hydro

First, enable Apache modules needed for revers proxy. Simply run these
commands on your server, as `root`:
``` sh
for mod in proxy proxy_http proxy_balancer rewrite
do
a2enmod $mod
done
```

Second, add a new site file on Apache config: 
`/etc/apache2/sites-available/aquama-hotspot.conf`
On this file, write this:
``` conf
<VirtualHost *:80>
    DocumentRoot {{ aquama_hotspot_static_folder_root }}
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    ProxyPass /static !
    ProxyPass /media !
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
    
</VirtualHost>
```

Replace `{{ aquama_hotspot_static_folder_root }}` with the path to a
folder where the static and the media directories can be found at
root.


If your Apache is directry accessible to client, adapt this config to:
- Manage connexion for your domaine
- Manage TLS connexion
- Add these infos on the header of the HTTP requests transfered to
  Aquama-Hotspot backend:
  - `X-Forwarded-Host`, set to the hostname managed by Apache
  - `X-Forwarded-Proto`, set to the scheme of the HTTP connexion used
    between client and this apache

Finally, enable this site for Apache. Simply run this
command on your server, as `root`:
``` sh
a2ensite aquama-hotspot.conf
```


### Start Apache ###

Finally, we are going to start Apache. Simply run these
commands on your server, as `root`:
``` sh
systemctl start apache2
systemctl enable apache2
```

If Apacahe already run, restart it.


## If running behind a revers proxy ##

If your installation of Aquama-Hydro run behind a reverse proxy, it's
important that this reverse proxy add these infos on the header of the
HTTP requests transfered to Aquama-Hotspot backend:
- `X-Forwarded-Host`, set to the hostname managed by Apache
- `X-Forwarded-Proto`, set to the scheme of the HTTP connexion used
  between client and this apache


## When update the app ##

After an update of the source code of Aquama-Hydro on your server, if
new migration scripts were made by the developer, you need to migrate
your database.

Simply run this command on your server, from the root of
Aquama-Hotspot project, with the user created at first step:
``` sh
python3 manage.py migrate
```
