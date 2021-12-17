from django.test import TestCase
from django.contrib.auth.models import (
    User,
    Group,
    Permission,
)
from django.urls import reverse, resolve
from unittest.mock import patch, Mock, mock_open
from datetime import (
    datetime,
    time,
)
from dateutil.parser import isoparse

from rest_framework.test import (
    APITestCase,
)
from rest_framework import status

from rest_framework.settings import api_settings

from hotspots import tools
from hotspots.models import (
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Location,
    OpeningHour,
)

import aquama_hydro_client


FAKE_CSV = """serial_number,name,bluetooth_name,longitude,latitude
"1000-1000-1000-1000",CSV1,CSV1b,0.1,0.2
"DCT13/022761",CSV2,CSV2b,0.3,0.4
"1000-1000-6-1000",CSV3,CSV3b,,
"""


class AquamaMachineTestCase(TestCase):
    """Test the model AquamaMachine"""

    def test_import_from_csv_file(self):
        """Test AquamaMachine.import_from_csv_file()"""
        # Make sure no AquamaMachine come from a CSV import
        machines_to_clean = AquamaMachine.objects.filter(
            origin=AquamaMachine.ORIGIN_CSV,
        )
        machines_to_clean.delete()

        # Simulate a CSV file
        with patch('hotspots.models.open',
                   mock_open(read_data=FAKE_CSV)) as m:
            # Run the fake import
            AquamaMachine.import_from_csv_file('fake')

        # Make sure the first machine is here
        self.assertTrue(
            AquamaMachine.objects.filter(
                serial_number=1000100010001000
            ).exists()
        )

        # Check first machine fields
        machine = AquamaMachine.objects.get(
                serial_number=1000100010001000
            )
        self.assertEqual(
            machine.name,
            'CSV1',
        )
        self.assertEqual(
            machine.bluetooth_name,
            'CSV1b',
        )
        self.assertEqual(
            machine.origin,
            AquamaMachine.ORIGIN_CSV,
        )
        self.assertEqual(
            machine.location.longitude,
            0.1,
        )
        self.assertEqual(
            machine.location.latitude,
            0.2,
        )

        # Make sure the second machine is here
        self.assertTrue(
            AquamaMachine.objects.filter(
                serial_number=1913000000022761
            ).exists()
        )

        # Check second machine fields
        machine = AquamaMachine.objects.get(
                serial_number=1913000000022761
            )
        self.assertEqual(
            machine.name,
            'CSV2',
        )
        self.assertEqual(
            machine.bluetooth_name,
            'CSV2b',
        )
        self.assertEqual(
            machine.origin,
            AquamaMachine.ORIGIN_CSV,
        )
        self.assertEqual(
            machine.location.longitude,
            0.3,
        )
        self.assertEqual(
            machine.location.latitude,
            0.4,
        )

        # Make sure the third machine is here
        self.assertTrue(
            AquamaMachine.objects.filter(
                serial_number=1000100000061000
            ).exists()
        )

        # Check third machine fields
        machine = AquamaMachine.objects.get(
                serial_number=1000100000061000
            )
        self.assertEqual(
            machine.name,
            'CSV3',
        )
        self.assertEqual(
            machine.bluetooth_name,
            'CSV3b',
        )
        self.assertEqual(
            machine.origin,
            AquamaMachine.ORIGIN_CSV,
        )
        self.assertEqual(
            machine.location,
            None,
        )


class ToolsTestCase(TestCase):
    """Test the functions of hotspots.tools"""
    def setUp(self):
        AquamaMachine.objects.create(serial_number=1)

    @patch('hotspots.models.aquama_hydro_client.aquama_hydro.AquamaHydro')
    def test_sync_aquama_machines_from_hydro(self,
                                             mock_class):
        """Test AquamaMachine.sync_from_hydro()

        Scenario:
        - Be sure an AquamaSolutionType exist with id 3
        - Create 3 AquamaMachine on Hotspot
          - 2 with hydro as origin
          - 1 with here as origin        
        - Simulate the AquamaHydro object to make it return 2
          AquamaMachine from Hydro for
          AquamaMachine.sync_from_hydro():
          - One already on Hotspot but with new data
          - One new
        - Still on the AquamaHydro simulation, simulate
          the return of get_aquama_machine_solution_type() method
        - Call AquamaMachine.sync_from_hydro()
        - See if:
          - The new AquamaMachine is created and its origin is hydro
          - The old AquamaMachine is updated
          - The AquamaMachine not on hydro is deleted
          - The AquamaMachine not created from hydro sync is here
          - The 2 AquamaMachine have the AquamaSolutionType with id 3
        - Modify the name of one machine make from the synchro
        - Call AquamaMachine.sync_from_hydro() again
        - See that the machine keep its name
        """
        # TODO:
        # Test that an updated aquama machine keep its name
        # Move this test on AquamaMachineTestCase
        
        # Be sure an AquamaSolutionType exist with id 3
        solution, created = AquamaSolutionType.objects.get_or_create(
            hydro_enum_value=3,
            defaults={
                'name': 'test',
            }
        )
        if created:
            solution.save()

        # Create the 3 AquamaMachine on Hotspot, the first one is
        # stored on a variable to have its name modified later
        aquama_machine_name_test = AquamaMachine(
            serial_number=1234,
            name='1234',
            bluetooth_name='1234',
            rfid_reader_enabled=True,
            origin=AquamaMachine.ORIGIN_HYDRO,
        )
        aquama_machine_name_test.save()
        AquamaMachine(
            serial_number=567,
            name='567',
            bluetooth_name='567',
            rfid_reader_enabled=False,
            origin=AquamaMachine.ORIGIN_HYDRO
        ).save()
        AquamaMachine(
            serial_number=666,
            name='666',
            bluetooth_name='666',
            rfid_reader_enabled=True,
            origin=AquamaMachine.ORIGIN_HERE
        ).save()

        # Simulate the AquamaHydro object to make it return 2
        # AquamaMachine from Hydro for
        # AquamaMachine.sync_from_hydro():
        # - One already on Hotspot but with new data
        # - One new
        hydro_simu = Mock()
        hydro_simu.get_all_aquama_machines.return_value = [
            aquama_hydro_client.aquama_machine.AquamaMachine(
                serial_number=1234,
                name='New name',
                rfid_reader_enabled=True,
                bluetooth_name='New name',
            ),
            aquama_hydro_client.aquama_machine.AquamaMachine(
                serial_number=890,
                name='890',
                bluetooth_name='890',
                rfid_reader_enabled=False,
            ),
        ]
        
        # Still on the AquamaHydro simulation, simulate
        # the return of get_aquama_machine_solution_type() method
        hydro_simu.get_aquama_machine_solution_type.return_value = 3

        mock_class.return_value = hydro_simu
        
        # Call AquamaMachine.sync_from_hydro()
        AquamaMachine.sync_from_hydro()

        # See if:
        # - The new AquamaMachine is created and its origin is hydro
        self.assertTrue(
            AquamaMachine.objects.filter(
                serial_number=890,
            ).exists()
        )
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=890,
            ).origin,
            AquamaMachine.ORIGIN_HYDRO,
        )
        # - The old AquamaMachine is updated
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=1234,
            ).bluetooth_name,
            'New name',
        )
        # - The AquamaMachine not on hydro is deleted
        self.assertFalse(
            AquamaMachine.objects.filter(
                serial_number=567,
            ).exists()
        )
        # - The AquamaMachine not created from hydro sync is here
        self.assertTrue(
            AquamaMachine.objects.filter(
                serial_number=666,
            ).exists()
        )
        # - The 2 AquamaMachine have the AquamaSolutionType with id 3
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=1234,
            ).aquama_solution_types.all()[0].hydro_enum_value,
            3
        )
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=890,
            ).aquama_solution_types.all()[0].hydro_enum_value,
            3
        )
        # - The 2 sync AquamaMachine have correct rfid_reader_enabled
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=1234,
            ).rfid_reader_enabled,
            True,
        )
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=890,
            ).rfid_reader_enabled,
            False,
        )
        # - Modify the name of one machine make from the synchro
        aquama_machine_name_test.name = "Test name"
        aquama_machine_name_test.save()
        # - Call AquamaMachine.sync_from_hydro() again
        AquamaMachine.sync_from_hydro()
        # - See that the machine keep its name
        self.assertEqual(
            AquamaMachine.objects.get(
                serial_number=aquama_machine_name_test.serial_number
            ).name,
            "Test name"
        )



class APIv1TestCase(APITestCase):
    """Test the Hotspot REST API V1"""

    def setUp(self):
        """Setup the test"""
        # Create a new Location
        self.location = Location.objects.create(
            name='Location test',
            description='This is a location made for testing',
            longitude=0.123,
            latitude=0.456,
            street='No where street',
            npa='000',
            city='Nowhere city',
            country="I don't know",
            floor=-1,
            additional_informations="Nothing",
            phone_number="001112222",
            website="https://aquama.ch",
        )
        self.location.save()
        # Create a new AquamaSolutionType
        self.solution_type = AquamaSolutionType.objects.create(
            name='Solution Test',
            hydro_enum_value=7,
        )
        self.solution_type.save()
        # Create a new Aquama Machine
        self.machine = AquamaMachine.objects.create(
            serial_number=101010101010,
            name='Test machine for API',
            bluetooth_name='bluetooth_name',
            location=self.location,
        )
        self.machine.aquama_solution_types.add(self.solution_type)
        self.machine.save()
        # Create a new Opening Hour
        self.opening_hours = OpeningHour.objects.create(
            location=self.location,
            opening_time=time(10,30,00),
            closing_time=time(11,30,00),
            friday=True,
        )
        self.opening_hours.save()
        # Create a new AquamaPointOfSale
        self.pos = AquamaPointOfSale.objects.create(
            name='POS test',
        )
    
    def test_get_location(self):
        """Test whenwe get a Location"""
        # Do the request
        request = self.client.get(
            reverse(
                'api_v1:location-detail',
                args=[self.location.pk],
            ),
            format='json',
        )

        result = request.json()

        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the location object and the received
        # JSON object
        common_fields = (
            'name',
            'description',
            'longitude',
            'latitude',
            'street',
            'npa',
            'city',
            'country',
            'floor',
            'additional_informations',
            'phone_number',
            'website',
            'created_on',
            'available_on',
        )

        # Relation fields on the received JSON object
        relation_fields = (
            'opening_hours',
            'aquama_machines',
            'aquama_points_of_sale',
            'images',
        )

        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields + relation_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in result.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the location object and the
        # received JSON object have the same value
        for field in common_fields:
            if field in ('created_on',):
                self.assertEqual(
                    isoparse(result.get(field)),
                    self.location.__dict__.get(field),
                    msg=f'"{field}" of the location not corresponding',
                )
            else:
                self.assertEqual(
                    result.get(field),
                    self.location.__dict__.get(field),
                    msg=f'"{field}" of the location not corresponding',
                )

        # Test if relation fields are OK
        self.assertEqual(
            result.get('aquama_points_of_sale'),
            [],
            msg=f'"aquama_points_of_sale" of the location not corresponding',
        )
        self.assertEqual(
            result.get('images'),
            [],
            msg=f'"images" of the location not corresponding',
        )

        # Test the nested opening_hours
        self.assertTrue(
            isinstance(
                result.get('opening_hours'),
                list,
            ),
            msg=f'"opening_hours" of the location not corresponding',
        )
        opening_hour = result.get('opening_hours')[0]
        self.assertTrue(
            reverse(
                'api_v1:openinghour-detail',
                args=[self.opening_hours.pk]
            ) in opening_hour.get('url'),
            msg='"url" from the nested opening hour not corresponding',
        )
        nested_opening_hour_fields = (
            'opening_time',
            'closing_time',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        )
        for field in nested_opening_hour_fields:
            if field in ('opening_time', 'closing_time'):
                self.assertEqual(
                    time.fromisoformat(
                        opening_hour.get(field)
                    ),
                    self.opening_hours.__dict__.get(field),
                    msg=f'"{field}" of the open hour not corresponding',
                )
            else:
                self.assertEqual(
                    opening_hour.get(field),
                    self.opening_hours.__dict__.get(field),
                    msg=f'"{field}" of the open hour not corresponding',
                )
        
        # Test the nested Aquama Machine
        machines = result.get('aquama_machines')
        # Machines is a list
        self.assertTrue(
            isinstance(machines, list),
            msg='List of machines is not a list'
        )
        self.assertEqual(
            len(machines),
            1,
            msg='List of machines have not 1 machine',
        )
        machine = machines[0]
        # Test machine URL
        self.assertTrue(
            reverse(
                'api_v1:aquamamachine-detail',
                args=[self.machine.pk],
            ) in machine.get('url'),
        )
        # Teste machine other fields
        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the Aquama Machine object and the
        # received JSON object
        common_fields = (
            'name',
            'bluetooth_name',
            'serial_number',
            'wwan_available',
            'rfid_reader_enabled',
        )

        # Relation fields on the received JSON object
        relation_fields = (
            # 'location',
            'aquama_solution_types',
            'images',
        )

        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields + relation_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in machine.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the Aquama Machine object and the
        # received JSON object have the same value
        for field in common_fields:
            self.assertEqual(
                machine.get(field),
                self.machine.__dict__.get(field),
                msg=f'"{field}" of the machine not corresponding',
            )
        # Test the AquamaSolutionType of the AquamaMachine
        solution_type = machine.get('aquama_solution_types')[0]
        self.assertTrue(
            reverse(
                'api_v1:aquamasolutiontype-detail',
                args=[self.solution_type.pk],
            ) in solution_type.get('url'),
            msg='"url" of the nested solution type is wrong',
        )
        self.assertEqual(
            solution_type.get('name'),
            self.solution_type.name,
            msg='"name" of the nested solution type is wrong',
        )
        self.assertEqual(
            solution_type.get('hydro_enum_value'),
            self.solution_type.hydro_enum_value,
            msg='"hydro_enum_value" of the nested solution type is wrong',
        )

    def test_get_aquama_machine(self):
        """Test when we get an Aquama Machine"""
        # Do the request
        request = self.client.get(
            reverse(
                'api_v1:aquamamachine-detail',
                args=[self.machine.pk],
            ),
            format='json',
        )

        result = request.json()

        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the Aquama Machine object and the
        # received JSON object
        common_fields = (
            'name',
            'bluetooth_name',
            'serial_number',
            'wwan_available',
            'rfid_reader_enabled',
        )

        # Relation fields on the received JSON object
        relation_fields = (
            'location',
            'aquama_solution_types',
            'images',
        )

        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields + relation_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in result.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the Aquama Machine object and the
        # received JSON object have the same value
        for field in common_fields:
            self.assertEqual(
                result.get(field),
                self.machine.__dict__.get(field),
                msg=f'"{field}" of the machine not corresponding',
            )

        # Test if relation fields are OK

        # Teste the nested solution type
        self.assertTrue(
            isinstance(
                result.get('aquama_solution_types'),
                list,
            ),
            msg=f'"aquama_solution_types" of the machine is not a list',
        )
        # Extract solution type
        solution_type = result.get('aquama_solution_types')[0]
        self.assertTrue(
            reverse(
                'api_v1:aquamasolutiontype-detail',
                args=[self.solution_type.pk]
            ) in solution_type.get('url'),
            msg='"url" of nested solution type not corresponding',
        )
        self.assertEqual(
            solution_type.get('name'),
            self.solution_type.name,
            msg='"name" of nested solution type not corresponding',
        )
        self.assertEqual(
            solution_type.get('hydro_enum_value'),
            self.solution_type.hydro_enum_value,
            msg='"hydro_enum_value" of not corresponding',
        )

        # Teste the nested location
        location = result.get('location')
        self.assertTrue(
            isinstance(
                location,
                dict,
            ),
            msg=f'"location" of the machine is not a dict',
        )
        self.assertTrue(
            reverse(
                'api_v1:location-detail',
                args=[self.location.pk],
            ) in location.get('url'),
            msg='"url" of nested location not corresponding',
        )
        nested_location_fields = (
            'name',
            'description',
            'longitude',
            'latitude',
            'street',
            'npa',
            'city',
            'country',
            'floor',
            'additional_informations',
            'phone_number',
            'website',
            'created_on',
            'available_on',
        )
        for field in nested_location_fields:
            if field in ('created_on',):
                self.assertEqual(
                    isoparse(location.get(field)),
                    self.location.__dict__.get(field),
                    msg=f'"{field}" of nested location not corresponding',
                )
            else:
                self.assertEqual(
                    location.get(field),
                    self.location.__dict__.get(field),
                    msg=f'"{field}" of nested location not corresponding',
                )
        self.assertEqual(
            result.get('images'),
            [],
            msg=f'"images" of the machine not corresponding',
        )

    def test_get_opening_hour(self):
        """Test when we get an OpeningHour"""
        # Do the request
        request = self.client.get(
            reverse(
                'api_v1:openinghour-detail',
                args=[self.opening_hours.pk],
            ),
            format='json',
        )

        result = request.json()

        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the OpeningHour object and the
        # received JSON object
        common_fields = (
            'opening_time',
            'closing_time',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        )

        # Relation fields on the received JSON object
        relation_fields = (
            'location',
        )

        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields + relation_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in result.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the OpeningHour object and the
        # received JSON object have the same value
        for field in common_fields:
            if field in ('opening_time', 'closing_time'):
                self.assertEqual(
                    time.fromisoformat(
                        result.get(field)
                    ),
                    self.opening_hours.__dict__.get(field),
                    msg=f'"{field}" of the open hour not corresponding',
                )
            else:
                self.assertEqual(
                    result.get(field),
                    self.opening_hours.__dict__.get(field),
                    msg=f'"{field}" of the open hour not corresponding',
                )

        # Test if relation fields are OK
        self.assertTrue(
            reverse(
                'api_v1:location-detail',
                args=[self.location.pk],
            ) in result.get('location'),
            msg=f'"location" of the open hour not corresponding',
        )

    def test_get_aquama_solution_type(self):
        """Test when we get an AquamaSolutionType"""
        # Do the request
        request = self.client.get(
            reverse(
                'api_v1:aquamasolutiontype-detail',
                args=[self.solution_type.pk],
            ),
            format='json',
        )

        result = request.json()

        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the AquamaSolutionType object and the
        # received JSON object
        common_fields = (
            'name',
            'hydro_enum_value',
        )


        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in result.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the AquamaSolutionType object
        # and the received JSON object have the same value
        for field in common_fields:
            self.assertEqual(
                result.get(field),
                self.solution_type.__dict__.get(field),
                msg=f'"{field}" of the solution type not corresponding',
            )

    def test_get_aquama_point_of_sale(self):
        """Test when we get an AquamaPointOfSale"""
        # Do the request
        request = self.client.get(
            reverse(
                'api_v1:aquamapointofsale-detail',
                args=[self.solution_type.pk],
            ),
            format='json',
        )

        result = request.json()

        # Fields only on the received JSON object
        unique_fields = (
            'url',
        )

        # Fields common between the AquamaPointOfSale object and the
        # received JSON object
        common_fields = (
            'name',
        )

        # Relation fields on the received JSON object
        relation_fields = (
            'location',
        )

        # All fields needed to be on the received JSON object
        fields = unique_fields + common_fields + relation_fields

        # Test if all fields are on the json response
        for field in fields:
            self.assertTrue(
                field in result.keys(),
                msg=f'{field} not in the received JSON object',
            )

        # Test if common fields between the AquamaPointOfSale object
        # and the received JSON object have the same value
        for field in common_fields:
            self.assertEqual(
                result.get(field),
                self.pos.__dict__.get(field),
                msg=f'"{field}" of the point of sale not corresponding',
            )

        # Test if relation fields are OK
        self.assertEqual(
            result.get('location'),
            None,
            msg=f'"location" of the point of sale not corresponding',
        )


class APIv2TestCase(APITestCase):
    """Test the Hotspot REST API V2"""

    def setUp(self):
        """Setup the test"""
        # Create a customer group
        self.customer_group = Group.objects.create(
            name='customer',
        )
        self.customer_group.permissions.set(
            list(
                Permission.objects.filter(codename__in=[
                    'add_location',
                    'change_location',
                    'delete_location',
                    'view_location',
                ])
            )
        )
        self.customer_group.save()
        
        # Create an admin group
        self.admin_group = Group.objects.create(
            name='admins',
        )
        self.admin_group.permissions.set(
            list(
                Permission.objects.filter(codename__in=[
                    'add_location',
                    'change_location',
                    'delete_location',
                    'view_location',
                ])
            )
        )
        self.admin_group.save()
        
        # Create an user with no right
        self.user = User.objects.create(
            username='User with no right',
            password='This will be deleted after the test',
        )
        self.user.save()
        self.client.force_authenticate(user=self.user)

        # Create a customer
        self.customer = User.objects.create(
            username='Customer',
            password='This will be deleted after the test',
        )
        self.customer.groups.add(self.customer_group)
        self.customer.save()

        # Create a customer to be owner of some objects
        self.customer_owner = User.objects.create(
            username='Customer owner',
            password='This will be deleted after the test',
        )
        self.customer.groups.add(self.customer_group)
        self.customer.save()

        # Create an admin
        self.admin = User.objects.create(
            username='Admin',
            password='This will be deleted after the test',
        )
        self.admin.groups.add(self.admin_group)
        self.admin.save()

    def check_read(self, endpoint, data, pk=None):
        """Check the read access on the given endpoint
        
        This check:
        - Not logged user have read access
        - Logged customer have read access
        - Logged admins have read access

        pk can be part of the endpoint or given as pk parameter
        """
        # If necessary, build the endpoint url
        if pk:
            endpoint = f'{endpoint}{pk}/'
        
        # Check Not logged user read access
        self.client.force_authenticate(user=None)
        response = self.client.get(endpoint)
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data,
            msg=f'{endpoint} read access failed for AnonymousUser',
        )

        # Check logged customer read access
        self.client.force_authenticate(self.customer)
        response = self.client.get(endpoint)
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data,
            msg=f'{endpoint} read access failed for Customer',
        )

        # Check logged admins read access
        self.client.force_authenticate(self.admin)
        response = self.client.get(endpoint)
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data,
            msg=f'{endpoint} read access failed for Admin',
        )

    def check_create(self, endpoint, data):
        """Check the create access on the given endpoint

        This check:
        - Not logged user can't create
        - Logged user with no right can't create
        - Logged customer can create
        - Logged admin can create"""
        # Check not logged user can't create
        self.client.force_authenticate(user=None)
        response = self.client.post(
            endpoint,
            data,
            format='json',
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='Not logged user should be forbidden to create',
        )

        # Check logged user with no right can't create
        self.client.force_authenticate(self.user)
        response = self.client.post(
            endpoint,
            data,
            format='json',
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='Logged user with no right should be forbidden to create',
        )

        # Check logged customer can create
        self.client.force_authenticate(self.customer)
        response = self.client.post(
            endpoint,
            data,
            format='json',
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            msg='Logged user with right should be able to create',
        )
        # Check that the data are correctly created
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data,
            msg=f'{endpoint} send and written data are différent',
        )

        # Check logged admin can create
        self.client.force_authenticate(self.admin)
        response = self.client.post(
            endpoint,
            data,
            format='json',
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            msg='Logged admin should be able to create',
        )
        # Check that the data are correctly created
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data,
            msg=f'{endpoint} send and written data are différent',
        )
        
    def check_modify(self, endpoint, data_1, data_2,
                     partial_data_1, partial_data_2):
        """Check the partial and full modify access on the given endpoint

        This check:
        - Not logged user can't modify
        - Logged user with no right can't modify
        - Logged user with right can't modify if not owner
        - Logged user with right can modify if owner
        - Logged admin can modify, owner or not

        This method use alternatively 2 differents data to update the
        endpoint.
        """
        # Not logged user can't modify with put
        self.client.force_authenticate(user=None)
        response = self.client.put(
            endpoint,
            data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='Not logged user should be forbidden to modify with put',
        )

        # Not logged user can't modify with patch
        self.client.force_authenticate(user=None)
        response = self.client.patch(
            endpoint,
            partial_data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='Not logged user should be forbidden to modify with patch',
        )
        
        # Logged user with no right can't modify with put
        self.client.force_authenticate(user=self.user)
        response = self.client.put(
            endpoint,
            data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='User with no right should be forbidden to modify with put',
        )

        # Logged user with no right can't modify with patch
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            endpoint,
            partial_data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='User with no right should be forbidden to modify with patch',
        )
        
        # Logged user with right can't modify if not owner with put
        self.client.force_authenticate(user=self.customer)
        response = self.client.put(
            endpoint,
            data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='User with no right should be forbidden to modify with put',
        )
        
        # Logged user with right can't modify if not owner with patch
        self.client.force_authenticate(user=self.customer)
        response = self.client.patch(
            endpoint,
            partial_data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='User not owner should be forbidden to modify with patch',
        )
        
        # Logged user with right can modify if owner with put
        self.client.force_authenticate(user=self.customer_owner)
        response = self.client.put(
            endpoint,
            data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            msg='User not owner should be forbidden to modify with put',
        )
        # Check that the data are correctly updated
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data_1,
            msg=f'{endpoint} send and written data are différent',
        )

        # Logged user with right can modify if owner with patch
        self.client.force_authenticate(user=self.customer_owner)
        response = self.client.patch(
            endpoint,
            partial_data_1,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            msg='User with no right should be forbidden to modify with patch',
        )
        # Check that the data are correctly updated
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            partial_data_1,
            msg=f'{endpoint} send and written data are différent',
        )
        
        # Logged admin can modify, owner or not with put
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(
            endpoint,
            data_2,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            msg='User with no right should be forbidden to modify with put',
        )
        # Check that the data are correctly updated
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            data_2,
            msg=f'{endpoint} send and written data are différent',
        )

        # Logged admin can modify, owner or not with patch
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            endpoint,
            partial_data_2,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            msg='User with no right should be forbidden to modify with patch',
        )
        # Check that the data are correctly updated
        cleaned_response_data = response.json().pop('url')
        self.assertEqual(
            cleaned_response_data,
            partial_data_2,
            msg=f'{endpoint} send and written data are différent',
        )

    def check_delete(self, endpoint, data=None):
        """Check the delete access on the given endpoint

        - Not logged user can't delete
        - Logged user with no right can't delete
        - Logged user with right can't delete if not owner
        - Logged user with right can delete if owner
        - Logged admin can delete, owner or not

        Note: 
        - If data given, an object is created from at the endpoint
          then deleted
        - If no data given, the objets at the endpoint is deleted
        """
        if data:
            self.client.force_authenticate(user=self.customer_owner)
            response = self.client.post(
                endpoint,
                data,
            )
            obj_endpoint = response.json().pop('url')
        else:
            obj_endpoint = endpoint

        # Not logged user can't delete
        self.client.force_authenticate(user=None)
        response = self.client.delete(
            obj_endpoint,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='Not logged user should be forbidden to delete',
        )
        
        # Logged user with no right can't delete
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            obj_endpoint,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            msg='User with no right should be forbidden to delete',
        )
        
        # Logged user with right can't delete if not owner
        # Logged user with right can delete if owner
        # Logged admin can delete, owner or not
    
    # def test_location(self):
    #     """Test the Location endpoint from the API
    #     """
    #     # TODO: Adapt this test to new users and groups
    #     # New location json
    #     location_json = {
    #         'name': 'Aquama',
    #         'description': 'Aquama Suisse',
    #         'longitude': 46.504749,
    #         'latitude': 6.481357,
    #         'street': 'Route de Lully 5C',
    #         'npa': '1131',
    #         'city': 'Tolochenaz',
    #         'country': 'Switzerland',
    #         'floor': '2',
    #         'opening_hours': [],
    #         'additional_informations': 'Lake Geneva Park',
    #         'phone_number': '00 00 00 00',
    #         'website': 'https://aquama.ch/fr/',
    #         'available_on': None,
    #         'images': [],
    #     }

    #     # Check the creation of location on the API
    #     self.check_create(
    #         reverse(
    #             'api_v2:location-list',
    #         ),
    #         location_json,
    #     )
