# Generated by Django 3.2 on 2021-07-15 06:45

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AquamaSolutionType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='name')),
                ('hydro_enum_value', models.IntegerField(default=0, help_text='Number used in cl_use enum of Aquama Hydro', verbose_name='hydro enum value')),
            ],
            options={
                'verbose_name': 'Aquama Solution Type',
                'verbose_name_plural': 'Aquama Solution Types',
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='', verbose_name='image')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='name')),
                ('description', models.TextField(verbose_name='description')),
            ],
            options={
                'verbose_name': 'image',
                'verbose_name_plural': 'images',
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='name')),
                ('description', models.TextField(blank=True, verbose_name='description')),
                ('longitude', models.FloatField(blank=True, null=True, verbose_name='longitude')),
                ('latitude', models.FloatField(blank=True, null=True, verbose_name='latitude')),
                ('street', models.CharField(blank=True, max_length=255, null=True, verbose_name='street')),
                ('npa', models.CharField(blank=True, max_length=255, null=True, verbose_name='NPA')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='city')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='country')),
                ('floor', models.IntegerField(blank=True, null=True, verbose_name='floor')),
                ('additional_informations', models.TextField(blank=True, verbose_name='additional informations')),
                ('phone_number', models.CharField(blank=True, max_length=255, verbose_name='phone number')),
                ('website', models.URLField(blank=True, validators=[django.core.validators.URLValidator(schemes=['http', 'https'])], verbose_name='website')),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True, verbose_name='date created')),
                ('available_on', models.DateTimeField(blank=True, null=True, verbose_name='date available')),
                ('images', models.ManyToManyField(blank=True, to='hotspots.Image', verbose_name='images')),
            ],
            options={
                'verbose_name': 'location',
                'verbose_name_plural': 'locations',
            },
        ),
        migrations.CreateModel(
            name='OpeningHour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opening_time', models.TimeField(verbose_name='opening time')),
                ('closing_time', models.TimeField(verbose_name='closing time')),
                ('monday', models.BooleanField(default=False, verbose_name='monday')),
                ('tuesday', models.BooleanField(default=False, verbose_name='tuesday')),
                ('wednesday', models.BooleanField(default=False, verbose_name='wednesday')),
                ('thursday', models.BooleanField(default=False, verbose_name='thursday')),
                ('friday', models.BooleanField(default=False, verbose_name='friday')),
                ('saturday', models.BooleanField(default=False, verbose_name='saturday')),
                ('sunday', models.BooleanField(default=False, verbose_name='sunday')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hotspots.location', verbose_name='location')),
            ],
            options={
                'verbose_name': 'opening hour',
                'verbose_name_plural': 'opening hours',
            },
        ),
        migrations.CreateModel(
            name='AquamaPointOfSale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hotspots.location', verbose_name='location')),
            ],
            options={
                'verbose_name': 'Point of sale',
                'verbose_name_plural': 'Points of sale',
            },
        ),
        migrations.CreateModel(
            name='AquamaMachine',
            fields=[
                ('serial_number', models.BigIntegerField(primary_key=True, serialize=False, unique=True, verbose_name='serial number')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='name')),
                ('bluetooth_name', models.CharField(max_length=255, unique=True, verbose_name='bluetooth name')),
                ('wwan_available', models.BooleanField(default=False, verbose_name='WWAN available')),
                ('aquama_solution_types', models.ManyToManyField(blank=True, to='hotspots.AquamaSolutionType', verbose_name='aquama solution type')),
                ('images', models.ManyToManyField(blank=True, to='hotspots.Image', verbose_name='images')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hotspots.location', verbose_name='location')),
            ],
            options={
                'verbose_name': 'Aquama machine',
                'verbose_name_plural': 'Aquama machines',
            },
        ),
    ]
