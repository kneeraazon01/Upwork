"""Command sync_aquama_machines_from_hydro, added to ./manage.py"""

from django.core.management.base import BaseCommand, CommandError
from hotspots.models import AquamaMachine


class Command(BaseCommand):
    help = 'Sync all AquamaMachine from Aquama-Hydro service'

    def handle(self, *args, **kwargs):
        """Do the command"""
        AquamaMachine.sync_from_hydro()
        self.stdout.write(self.style.SUCCESS('Sync success'))
