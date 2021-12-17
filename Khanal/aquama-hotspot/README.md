# Aquama-Hotspot

This service give many informations for the Aquama Hotspots.

For now, this service is about:

- Locations
- Aquama Machines
- Aquama points of sale

## Documentation

A documentation is readable inside the folder `doc/`.

## Production

For production documentation, read `doc/production.md`

## Development

### Requirements

You need a functional Python >= 3.7 environment with Poetry installed.

### Install

First, install development dependencies:

```sh
poetry install
```

Then, enter the shell with `virtualenv`:

```sh
poetry shell
```

After, initialize the database:

```sh
python manage.py migrate
```

Finally create the super user:

```sh
python manage.py createsuperuser
```

### Initial data

Load initial Aquama solution types:

```sh
python manage.py loaddata AquamaSolutionType_start.json
```

### Run

If you need it, you can run a local web server:

```sh
python manage.py runserver
```

Or run the unit tests:

```sh
python manage.py test
```

For the complete list of the `manage.py` commands:

```sh
python manage.py
```

For more informations about the officials commands of `manage.py`, you
can read the official documentation:
https://docs.djangoproject.com/fr/3.2/ref/django-admin/

## Author

Sébastien Gendre <sgendre@aquama.com>
