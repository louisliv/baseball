from django.shortcuts import render

from rest_framework.decorators import action

from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.conf import settings

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views

from .models import Profile
from .serializers import ProfileSerializer
from django.contrib import auth

from base64 import b64decode
from django.core.files.base import ContentFile
import sys
from medialibrary.models import MediaItem
from medialibrary.serializers import MediaItemSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def update(self, request, pk=None):
        data = request.data
        profile = self.get_object()

        profile.user.first_name = data.get('first_name')
        profile.user.last_name = data.get('last_name')
        profile.user.username = data.get('username')
        profile.user.email = data.get('email')
        profile.user.save()

        profile.refresh_from_db()

        return Response(ProfileSerializer(profile).data, status=status.HTTP_200_OK)

    @action(methods=['post', 'put', 'patch'], detail=True)
    def update_avatar(self, request, pk=None):
        user = request.user
        data = request.data
        avatar = data['avatar']

        print >> sys.stderr, avatar

        avatar = avatar.split('base64,', 1 )

        image_data = b64decode(avatar[1])

        try:
            profile = self.get_object()
            profile.avatar = ContentFile(image_data, request.user.first_name + request.user.last_name +'.png')
            profile.save()

            return Response(ProfileSerializer(profile).data, status=status.HTTP_201_CREATED)
        except:
            return Response({
                'status': 'Bad request',
                'message': 'Avatar could not be updated with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
                'status': 'Bad request',
                'message': 'Avatar could not be updated with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True)
    def uploaded_media(self, request, pk=None):
        profile = self.get_object()

        mediaitems = profile.user.mediaitem_set.all()
        serializer = MediaItemSerializer(mediaitems, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class AuthViewSet(viewsets.ViewSet):
    @action(methods=['get'], detail=False)
    def current(self, request):
        try:
            profile = Profile.objects.get(user = request.user.id)
            return Response(ProfileSerializer(profile).data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response(None, status.HTTP_200_OK)

        return Response(None, status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def is_authenticated(self, request):
        return Response(request.user.is_authenticated())

    @action(methods=['post', 'get'], detail=False)
    def login(self, request):
        if request.method == 'GET':
            if request.user.is_authenticated():
                profile = Profile.objects.get(user=request.user.id)
                serializer = ProfileSerializer(profile)
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
                    profile = Profile.objects.get(user=auth_user.id)
                    serialized = ProfileSerializer(profile)
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

    @action(methods=['post'], detail=False)
    def logout(self, request):
        auth.logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=False)
    def register(self, request):
        user_data = request.data

        try:
            new_user = User.objects.create_user(
                username = user_data['username'], 
                email = user_data['email'], 
                password = user_data['password']
            )
            new_user.first_name = user_data['first_name']
            new_user.last_name = user_data['last_name']
            new_user.save()

            profile = Profile.objects.create(user=new_user)

            return Response(ProfileSerializer(profile).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print >> sys.stderr, str(e)
            return Response({
                'status': 'Bad request',
                'message': 'Account could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({}, status=status.HTTP_204_NO_CONTENT)