from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class HotspotsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hotspots'
    verbose_name = _('hotspots')
