from django.shortcuts import render

from apps.Candidates.models import Candidates

def index(request):
    return render(request, 'dist/index.html')

def candidates(request, slug):
    candidate = Candidates.objects.get(slug=slug)
    return render(request, 'dist/index.html', {'candidate': candidate})