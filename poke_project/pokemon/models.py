from webbrowser import get
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Pokemon(models.Model):
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    level = models.IntegerField(null=True)
    name = models.CharField(max_length=255)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name
