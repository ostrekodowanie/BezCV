from django.shortcuts import render

from apps.Candidates.models import Candidates

def index(request):
    return render(request, 'dist/index.html')

def candidates(request, id):
    Candidates.objects.filter(is_verified=True).get(id=id)
    return render(request, 'dist/index.html')