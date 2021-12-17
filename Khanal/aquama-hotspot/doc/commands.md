# Commands #

The hotspot app add 2 new commands to the manage.py script:
- `sync_aquama_machines_from_hydro`
- `import_locations`


## `sync_aquama_machines_from_hydro` ##

`sync_aquama_machines_from_hydro` syncronize AquamaMachine objects
with Aquama-Hydro service. This command take no arguments.

If an AquamaMachine exist on Aquama-Hydro but not on Aquama-Hotspot, a
new AquamaMachine is created on Hotspot.

If an AquamaMachine exist on Aquama-Hydro and on Aquama-Hotspot, it is
updated on Hotspot.

If an AquamaMachine don't exist on Aquama-Hydro but on Aquama-Hotspot,
it is deleted on Hotspot.

To run it:
``` sh
./manage.py sync_aquama_machines_from_hydro
```

To regularly syncronize AquamaMachine objects with Aquama-Hydro
service, you need to define a cron entry on the server operating
system.


## `import_locations` ##

`import_locations` import AquamaMachine locations from a CSV file.
This command take one argument: the path to the CSV file.

The CSV need 3 fields with a header:
- `serial_number`: An integer
- `longitude`: A float
- `latitude`: A float

Exemple:
``` csv
serial_number,longitude,latitude
2002999999991000,46.226553,6.140272
2002200600020000,46.226553,6.140272
2002200600031000,46.192214,6.260825
2002201000071000,,
```

If an entry in the CSV have a correct serial number but there is no
Location object on Hotspot with the longitude and latitude, a new
Location object is created and the AquamaMachine corresponding to the
serial number is linked to the new Location.

If an entry in the CSV have a correct serial number and there is a
Location object on Hotspot with the longitude and latitude, the
AquamaMachine corresponding to the serial number is linked to the new
Location.

If an entry in the CSV have a serial number that not corresponding to any
AquamaMachine object on Hotspot, nothing append.

If an entry in the CSV have an empty or 0.0 value for longitude and
latitude, nothing append.

To run it:
``` sh
./manage.py import_locations my_locations.csv
```
