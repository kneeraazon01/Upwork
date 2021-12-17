# Generated by Django 3.2 on 2021-08-16 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotspots', '0005_alter_aquamamachine_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='available_on',
            field=models.DateTimeField(blank=True, null=True, verbose_name='available on'),
        ),
        migrations.AlterField(
            model_name='location',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='created on'),
        ),
    ]
