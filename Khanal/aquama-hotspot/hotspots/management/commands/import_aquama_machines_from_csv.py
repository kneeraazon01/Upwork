"""Command import_aquama_machines_from_csv, added to ./manage.py"""

from django.core.management.base import BaseCommand, CommandError
from hotspots.models import AquamaMachine


class Command(BaseCommand):
    help = 'Import  from a CSV file and link Aquama machines to them'

    def add_arguments(self, parser):
        """Add one argument to this commande"""
        parser.add_argument(
            'file_path',
            type=str,
            help='Path to the CSV file to import',
        )

    def handle(self, *args, **kwargs):
        """Do the command"""
        file_path = kwargs.get('file_path')
        AquamaMachine.import_from_csv_file(file_path)
