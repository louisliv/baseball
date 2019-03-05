from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import filters
from .models import MediaItem, Comment
from .serializers import MediaItemSerializer, CommentSerializer
from watson import search as watson
import sys
try:
    from urllib import unquote
except ImportError:
    from urllib.parse import unquote

# Create your views here.
class MediaItemViewSet(viewsets.ModelViewSet):
    queryset = MediaItem.objects.all()
    serializer_class = MediaItemSerializer
    permission_classes = ()
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('uploaded_on', 'pk', 'love_count')
    ordering = ('pk',)

    def get_serializer_context(self):
        return {'request': self.request}

    @action(methods=['get'], detail=False)
    def search(self, request):
        search_term = request.query_params['search_term']

        search_results = watson.filter(MediaItem, unquote(search_term))

        serializer = MediaItemSerializer(search_results, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def related(self, request, pk=None):
        media_items = MediaItem.objects.exclude(pk=pk)

        serializer = MediaItemSerializer(media_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get', 'put', 'post'], detail=True)
    def comments(self, request, pk=None):
        media_item = self.get_object()

        if request.method in ['POST']:
            text = request.data.get('text', None)

            if text:
                comment = Comment.objects.create(
                    media_item=media_item,
                    text=text,
                    user=request.user
                )

                serializer = CommentSerializer(comment, context={'request': request})

                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(
                {'empty_text': 'Comments must have text.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        comments = media_item.comments.all().order_by('-commented_on')

        serializer = CommentSerializer(comments, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def toggle_user_love(self, request, pk=None):
        media_item = self.get_object()
        user = request.user
        
        if media_item.loves.filter(pk=user.pk).exists():
            media_item.loves.remove(user)
        else:
            media_item.loves.add(user)

        media_item.save()

        return Response(
            MediaItemSerializer(media_item, context={'request': request}).data,
            status=status.HTTP_200_OK
        )

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = ()

    def get_serializer_context(self):
        return {'request': self.request}

    @action(methods=['post'], detail=True)
    def toggle_user_love(self, request, pk=None):
        comment = self.get_object()
        user = request.user
        
        if comment.loves.filter(pk=user.pk).exists():
            comment.loves.remove(user)
        else:
            comment.loves.add(user)

        comment.save()

        return Response(
            CommentSerializer(comment, context={'request': request}).data,
            status=status.HTTP_200_OK
        )