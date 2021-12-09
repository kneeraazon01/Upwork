from django.db import models

# Create your models here.
class Product(models.Model):
    product_SKU = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Product SKU",
    )
    description = models.TextField(
        verbose_name="Description",
        blank=True,
        null=True,
    )
    quantity = models.IntegerField(
        verbose_name="Quantity",
        blank=True,
        null=True,
    )
    location = models.CharField(
        verbose_name="Location",
        blank=True,
        max_length=255,
    )
    actions = models.CharField(
        verbose_name="Actions",
        blank=True,
        null=True,
        max_length=255,
    )

    def __str__(self):
        return self.product_SKU
