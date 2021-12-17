"""Provide permissions classes for hotspot"""

from django.conf import settings
from django.contrib.auth.models import Group

from rest_framework import permissions

# import the logging library
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class IsOwneOrAdminrToModifyObject(permissions.BasePermission):
    """Object-level permission to allow owners or admin only to edit the
    object.

    The object need to have an 'owner' field, who is a ManyToOne field
    to 'from django.contrib.auth.models.User'.
    """

    def has_permission(self, request, view):
        # This class only concern the objets
        return True
    
    def has_object_permission(self, request, view, obj):
        # Any safe request (GET, HEAD or OPTIONS) are alowwed
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if the user is in the admin group
        if request.user.groups.filter(name=settings.ADMIN_GROUP_NAME).exists():
            return True

        # Check the owner
        if obj.owner == request.user:
            return True
        else:
            return False
