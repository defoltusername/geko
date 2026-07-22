from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=10)
    description=models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=7)
    
