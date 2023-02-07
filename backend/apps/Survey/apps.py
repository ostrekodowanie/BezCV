from django.apps import AppConfig

class SurveyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Survey'

    def ready(self):
        import apps.Survey.signals
