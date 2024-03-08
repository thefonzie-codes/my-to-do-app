# Generated by Django 5.0.3 on 2024-03-08 20:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0004_remove_listitem_completed_remove_listitem_due_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='listitem',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='listitem',
            name='due_date',
            field=models.DateField(default=datetime.date(2024, 3, 8)),
        ),
    ]
