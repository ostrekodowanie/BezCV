from django.shortcuts import render

from apps.Candidates.models import Candidates

def index(request):
    return render(request, 'dist/index.html')

def candidates(request, slug, id):
    candidate = Candidates.objects.filter(is_verified=True).get(slug=slug, id=id)
    return render(request, 'dist/index.html', {'candidate': candidate})