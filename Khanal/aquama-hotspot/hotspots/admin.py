from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _


from .models import (
    Location,
    OpeningHour,
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Image,
)

# Inlines classes
class OpeningHourLocationInline(admin.TabularInline):
    "OpeningHour model integration in Location admin"
    model = OpeningHour


class AquamaMachineLocationInline(admin.StackedInline):
    "Location model integration in admin"
    model = AquamaMachine


# Filters classes
class AquamaMachineHasLocationListFilter(admin.SimpleListFilter):
    """Filter on AquamaMachine admin list view based on if the
    AquamaMachine has a location"""
    title = _('With location')
    parameter_name = 'has_location'
    
    def lookups(self, request, model_admin):
        """
        Return the choices of this filter
        """
        return (
            ('yes', _('Yes')),
            ('no', _('No')),
        )
    
    def queryset(self, request, queryset):
        """
        Apply the filter on the queryset
        """
        if self.value() == 'yes':
            return queryset.exclude(
                location=None,
            )
        elif self.value() == 'no':
            return queryset.filter(
                location=None,
            )


# Admin classes
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    "Location model integration in admin"
    list_display = (
        'name',
        'created_on',
        'available_on',
    )
    search_fields = (
        'name',
        'description',
        'phone_number',
        'website',
    )
    readonly_fields = ('created_on',)
    inlines = [
        OpeningHourLocationInline,
    ]
    filter_horizontal = ('images',)
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'name',
                    'description',
                )
            }
        ),
        (
            _('Geographic coordinate'),
            {
                'fields': (
                    'longitude',
                    'latitude',
                ),
            },
        ),
        (
            _('Address'),
            {
                'fields': (
                    'street',
                    ('npa', 'city'),
                    'country',
                    'floor',
                    'additional_informations',
                ),
            },
        ),
        (
            _('Informations'),
            {
                'fields': (
                    'phone_number',
                    'website',
                    'available_on',
                    'images',
                )
            }
        ),
        (
            _('Metadatas'),
            {
                'fields': (
                    'created_on',
                )
            }
        ),
    )


@admin.register(AquamaMachine)
class AquamaMachineAdmin(admin.ModelAdmin):
    "AquamaMachine model integration in admin"
    search_fields = ('serial_number', 'name', 'bluetooth_name', 'location__name')
    list_display = (
        'serial_number',
        'name',
        'bluetooth_name',
        'wwan_available',
        'rfid_reader_enabled',
        'has_a_location',
    )
    list_filter = (
        'wwan_available',
        'rfid_reader_enabled',
        AquamaMachineHasLocationListFilter,
    )
    filter_horizontal = ('images',)
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'name',
                    'serial_number',
                    'aquama_solution_types',
                )
            }
        ),
        (
            _('Location'),
            {
                'fields': (
                    'location',
                ),
            },
        ),
        (
            _('Technical informations'),
            {
                'fields': (
                    'bluetooth_name',
                    'wwan_available',
                    'rfid_reader_enabled',
                ),
            },
        ),
        (
            _('Images'),
            {
                'fields': (
                    'images',
                )
            },
        ),
        (
            _('Metadatas'),
            {
                'fields': (
                    'origin',
                )
            }
        ),
    )

    @admin.display(
        description=_('Has a location'),
        boolean=True
    )
    def has_a_location(self, obj):
        """Say if a machine has a location"""
        return obj.location is not None


@admin.register(AquamaSolutionType)
class AquamaSolutionTypeAdmin(admin.ModelAdmin):
    "AquamaSolutionType model integration in admin"
    search_fields = ('name',)
    list_display = ('name', 'hydro_enum_value',)


@admin.register(AquamaPointOfSale)
class AquamaPointOfSaleAdmin(admin.ModelAdmin):
    "AquamaPointOfSale model integration in admin"


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    "Image model integration in admin"
    search_fields = ('name', 'description')
    fields = ('name', 'description', 'image', 'preview',)
    readonly_fields = ('preview',)

    @admin.display(description='Preview')
    def preview(self, instance):
        """Return a preview image in <img> html"""
        if instance.image:
            return format_html(
                '<img style="width:100%;height:auto;" src="{}" />',
                instance.image.url,
            )
        return _('No image saved yet')
