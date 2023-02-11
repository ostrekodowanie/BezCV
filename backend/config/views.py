from django.shortcuts import render, get_object_or_404

from apps.Candidates.models import Candidates

def index(request):
    return render(request, 'dist/index.html')

def candidates(request, id):
    candidates = Candidates.objects.filter(is_verified=True)
    get_object_or_404(candidates, id=id)
    return render(request, 'dist/index.html')