from django.shortcuts import render
from django.conf import settings
import os

def index(request):
	file_path = os.path.join(settings.INDEX_DIR, 'app/index.html')
	context = {}
	return render(request, file_path, context)