from django.db import models
from django.core import validators
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
import csv


from aquama_hydro_client.serial_number import (
    serial_number_string_to_int
)
import aquama_hydro_client

# import the logging library
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class OwnedModel(models.Model):
    """A model where each object have an owner"""
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


class Image(OwnedModel):
    """An image"""
    image = models.ImageField(
        verbose_name=_('image'),
    )
    name = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_('name'),
    )
    description = models.TextField(
        verbose_name=_('description'),
    )

    def __str__(self):
        return f'image: {self.name}'

    class Meta:
        verbose_name = _('image')
        verbose_name_plural = _('images')


class Location(OwnedModel):
    """An location, on a map"""
    name = models.CharField(
        max_length=255,
        verbose_name=_('name'),
    )
    description = models.TextField(
        verbose_name=_('description'),
        blank=True,
    )
    longitude = models.FloatField(
        blank=True,
        null=True,
        verbose_name=_('longitude'),
    )
    latitude = models.FloatField(
        blank=True,
        null=True,
        verbose_name=_('latitude'),
    )
    street = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_('street'),
    )
    npa = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_('NPA'),
    )
    city = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_('city'),
    )
    country = models.CharField(
        max_length=255,
        blank=True, null=True,
        verbose_name=_('country'),
    )
    floor = models.IntegerField(
        null=True,
        blank=True,
        verbose_name=_('floor'),
    )
    additional_informations = models.TextField(
        verbose_name=_('additional informations'),
        blank=True
    )
    phone_number = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('phone number')
    )
    website = models.URLField(
        validators=[validators.URLValidator(schemes=['http', 'https'])],
        verbose_name=_('website'),
        blank=True,
    )
    created_on = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('created on'),
        null=True,
    )
    available_on = models.DateTimeField(
        verbose_name=_('available on'),
        blank=True,
        null=True,
    )
    images = models.ManyToManyField(
        Image,
        verbose_name=_('images'),
        blank=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('location')
        verbose_name_plural = _('locations')


class OpeningHour(models.Model):
    """Location opening and closing hours.

    Each entry apply on one or many days.
    """
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        verbose_name=_('location'),
    )
    opening_time = models.TimeField(
        verbose_name=_('opening time'),
    )
    closing_time = models.TimeField(
        verbose_name=_('closing time'),
    )
    monday = models.BooleanField(
        default=False,
        verbose_name=_('monday'),
    )
    tuesday = models.BooleanField(
        default=False,
        verbose_name=_('tuesday'),
    )
    wednesday = models.BooleanField(
        default=False,
        verbose_name=_('wednesday'),
    )
    thursday = models.BooleanField(
        default=False,
        verbose_name=_('thursday'),
    )
    friday = models.BooleanField(
        default=False,
        verbose_name=_('friday'),
    )
    saturday = models.BooleanField(
        default=False,
        verbose_name=_('saturday'),
    )
    sunday = models.BooleanField(
        default=False,
        verbose_name=_('sunday'),
    )

    def __str__(self):
        days_dict = {
            'monday': self.monday,
            'tuesday': self.tuesday,
            'wednesday': self.wednesday,
            'thursday': self.thursday,
            'friday': self.friday,
            'saturday': self.saturday,
            'sunday': self.sunday,
        }
        days_str = ', '.join(
            (day_name
             for day_name, is_active
             in days_dict.items()
             if is_active)
        )
        return '{location_name} open hours on {days}'.format(
            location_name=self.location.name,
            days=days_str
        )

    class Meta:
        verbose_name = _('opening hour')
        verbose_name_plural = _('opening hours')


class AquamaSolutionType(models.Model):
    """A type of Aquama solution an Aquama machine can do"""
    name = models.CharField(
        unique=True,
        max_length=255,
        verbose_name=_('name'),
    )
    hydro_enum_value = models.IntegerField(
        default=0,
        verbose_name=_('hydro enum value'),
        help_text=_(
            'Number used in cl_use enum of Aquama Hydro'
        )
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Aquama Solution Type')
        verbose_name_plural = _('Aquama Solution Types')


class AquamaMachine(OwnedModel):
    """An Aquama machine. Linked to a location."""
    ORIGIN_HERE = 'here'
    ORIGIN_HYDRO = 'hydro'
    ORIGIN_CSV = 'csv'
    ORIGIN_CHOICES = [
        (ORIGIN_HERE, _('Here')),
        (ORIGIN_HYDRO, _('Hydro')),
        (ORIGIN_CSV, _('Import CSV')),
    ]
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        verbose_name=_('location'),
        null=True,
        blank=True,
    )
    serial_number = models.BigIntegerField(
        unique=True,
        primary_key=True,
        verbose_name=_('serial number'),
    )
    origin = models.CharField(
        max_length=5,
        choices=ORIGIN_CHOICES,
        default=ORIGIN_HERE,
        verbose_name=_('origin'),
        help_text=_(
            'from where this machin was created'
        )
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_('name'),
    )
    bluetooth_name = models.CharField(
        max_length=255,
        verbose_name=_('bluetooth name'),
    )
    aquama_solution_types = models.ManyToManyField(
        AquamaSolutionType,
        verbose_name=_('aquama solution type'),
        blank=True,
    )
    wwan_available = models.BooleanField(
        default=True,
        verbose_name=_('WWAN available'),
    )
    rfid_reader_enabled = models.BooleanField(
        default=False,
        verbose_name=_('RFID reader enabled'),
    )
    images = models.ManyToManyField(
        Image,
        verbose_name=_('images'),
        blank=True,
    )

    @classmethod
    def sync_from_hydro(cls) -> None:
        """Sync all AquamaMachine from Aquama-Hydro service.

        Create missing machine, update existing machines and remove
        machine no more on Aquama-Hydro.
        """
        # Build authentification for Aquama-Hydro
        hydro_auth = aquama_hydro_client.access.Auth(
            api_key=settings.HYDRO_API_KEY,
            origin=aquama_hydro_client.access.Origin[settings.HYDRO_API_ORIGIN],
            user=aquama_hydro_client.access.User[settings.HYDRO_API_USER_TYPE],
            user_key=settings.HYDRO_API_USER_KEY,
        )

        # Get the service object
        hydro_service = aquama_hydro_client.aquama_hydro.AquamaHydro(
            auth=hydro_auth,
            api_scheme=settings.HYDRO_API_SCHEME,
            api_address=settings.HYDRO_API_ADDRESS,
            api_port=settings.HYDRO_API_PORT,
        )

        # Get all Aquama machines from Aquama-Hydro
        hydro_machines = list(hydro_service.get_all_aquama_machines())

        # For each machine get from Hydro, create or update it in
        # AquamaMachine model and update its solution type
        for hydro_machine in hydro_machines:
            # Create or update machine base on hydro_machine
            try:
                # Try update the machine and keeping the name not modified
                machine = cls.objects.get(
                    serial_number=hydro_machine.serial_number
                )
                machine.bluetooth_name = hydro_machine.bluetooth_name
                machine.rfid_reader_enabled = hydro_machine.rfid_reader_enabled
                machine.origin = cls.ORIGIN_HYDRO
                machine.save()
            except cls.DoesNotExist:
                # If machine not exist, create it and name set from hydro_machine.name
                machine = cls.objects.create(
                    serial_number=hydro_machine.serial_number,
                    name=hydro_machine.name,
                    bluetooth_name=hydro_machine.bluetooth_name,
                    rfid_reader_enabled=hydro_machine.rfid_reader_enabled,
                    origin=cls.ORIGIN_HYDRO,
                )
                machine.save()

            # Get solution type from hydro service
            solution_type_id = hydro_service.get_aquama_machine_solution_type(
                hydro_machine.serial_number,
            )
            # Get the equivalent from AquamaSolutionType model
            solution_type = AquamaSolutionType.objects.filter(
                hydro_enum_value=solution_type_id,
            ).first()
            # Specific case of FalconR, theses machines don't have any plc constant
            # And the customer need to know that for theses machine the solution type
            # is "normal"
            if solution_type is None and str(hydro_machine.serial_number).startswith("1000"):
                solution_type = AquamaSolutionType.objects.filter(
                    hydro_enum_value=4,
                ).first()
            # If not exist in model
            if solution_type is None:
                # Get the solution None
                solution_type = AquamaSolutionType.objects.filter(
                    hydro_enum_value=0,
                ).first()
            # If solution type None not exist
            if solution_type is None:
                # Create it
                solution_type = AquamaSolutionType(
                    hydro_enum_value=0,
                    name='None',
                )
                solution_type.save()
                # Set solution type here
            machine.aquama_solution_types.set([solution_type])
            machine.save()

        # Clean AquamaMachine that come from hydro but no more exist on
        # Hydro
        serial_number_to_preserve = [
            hydro_machine.serial_number
            for hydro_machine in hydro_machines
        ]
        machines_to_delete = cls.objects.filter(
            origin=cls.ORIGIN_HYDRO,
        ).exclude(
            serial_number__in=serial_number_to_preserve,
        )
        machines_to_delete.delete()

    
    @classmethod
    def import_from_csv_file(cls, file_path: str) -> None:
        """Import machines and their locations from a CSV file"""
        # Open the file
        with open(file_path) as csvfile:
            # Read it
            reader = csv.DictReader(csvfile)
            # For each entry in the csv
            for row in reader:
                # Get the serial_number, converted in integer
                serial_number = serial_number_string_to_int(
                    row['serial_number'],
                )
                # Update or create the AquamaMachine
                machine, created = cls.objects.update_or_create(
                    serial_number=serial_number,
                    defaults={
                        'name': row.get(
                            'name', 'Unknown'
                        ),
                        'bluetooth_name': row.get(
                            'bluetooth_name', 'Unknown'
                        ),
                        'origin': cls.ORIGIN_CSV,
                    },
                )
                # If the entry have location
                longitude = row.get('longitude')
                latitude = row.get('latitude')
                if longitude and latitude:
                    # Get the location
                    location = Location.objects.filter(
                        longitude=longitude,
                        latitude=latitude,
                    ).first()
                    # If location don't exist
                    if location is None:
                        # Create it
                        location = Location(
                            name=_(
                                'Unknown'
                            ),
                            longitude=longitude,
                            latitude=latitude,
                        )
                        location.save()
                    # Assign machine to location
                    machine.location = location
                machine.save()
    
    def __str__(self):
        return f'Aquama machine {self.serial_number}'

    class Meta:
        ordering = ['serial_number']
        verbose_name = _('Aquama machine')
        verbose_name_plural = _('Aquama machines')


class AquamaPointOfSale(OwnedModel):
    """A point of sale for Aquama product"""
    name = models.CharField(
        max_length=255,
        verbose_name=_('name'),
        default=_('No name'),
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        verbose_name=_('location'),
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'Point of sale at {self.location.name}'

    class Meta:
        verbose_name = _('Point of sale')
        verbose_name_plural = _('Points of sale')
