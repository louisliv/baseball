from django.shortcuts import render
from .serializers import UserSerializer

from rest_framework.decorators import api_view, list_route, permission_classes

from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.conf import settings

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views

from django.contrib import auth

# Create your views here.
class AuthViewSet(viewsets.ViewSet):
	@list_route(methods=['get'])
	def current(self, request):
		if request.user:
			return Response(UserSerializer(request.user).data, 
				status=status.HTTP_200_OK)
		return Response({}, status=status.HTTP_404_NOT_FOUND)

	@list_route(methods=['get'])
	def is_authenticated(self, request):
		return Response(request.user.is_authenticated)

	@list_route(methods=['post'])
	def login(self, request):
		if request.method == 'GET':
			if request.user.is_authenticated():
				serializer = UserSerializer(request.user)
				return Response(serializer.data, status=status.HTTP_200_OK)
			return Response({}, status=status.HTTP_400_BAD_REQUEST)
		if request.method == 'POST':
			data = request.data
			username = data.get('username', None)
			password = data.get('password', None)

			try:
				user = User.objects.get(username = username)
			except User.DoesNotExist:
				return Response({
						'status': 'Unauthorized',
						'message': 'Account does not exist. Please contact an administrator.'
					}, status=status.HTTP_400_BAD_REQUEST)

			if username and password:
				auth_user = auth.authenticate(username=username, password=password)
				if user is not None:
					auth.login(request, auth_user)
					serialized = UserSerializer(request.user)
					return Response(serialized.data, status=status.HTTP_200_OK)
				else:
					return Response({
						'status': 'Unauthorized',
						'message': 'Incorrect password'
					}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response({
					'status': 'Unauthorized',
					'message': 'Username/password combination invalid.'
				}, status=status.HTTP_401_UNAUTHORIZED)


	@list_route(methods=['post'])
	def logout(self, request):
		auth.logout(request)

		return Response({}, status=status.HTTP_204_NO_CONTENT)