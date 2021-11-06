from .serializers import UserProfileSerializer, PostDateSerializer
from .models import PostDate, UserProfile
from rest_framework import generics, permissions, authentication
from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters


# ListCreateAPIView メソッド：GET, POST
class PostDateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = PostDate.objects.all()
    serializer_class = PostDateSerializer


# RetrieveUpdateDestroyAPIView メソッド:POST, PUT, DELETE
# 単一取得
# 詳細を更新
# 詳細を削除
class PostDateDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = PostDate.objects.all()
    serializer_class = PostDateSerializer


# ModelViewSet　1つのエンドポイントでmodelに紐付いたCRUD処理を実装してくれる
class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

# ユーザ作成のView(POST)


class AuthRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ユーザ情報取得のView(GET)


class AuthInfoGetView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, format=None):
        return Response(data={
            'id': request.user.id,
            'name': request.user.name,
            'email': request.user.email,
            'is_active': request.user.is_active,
            'is_staff': request.user.is_staff,
        },
            status=status.HTTP_200_OK)

# ユーザ情報更新のView(PUT)


class AuthInfoUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer
    #lookup_field = 'email'
    queryset = UserProfile.objects.all()

    def get_object(self):
        try:
            #instance = self.queryset.get(email=self.request.user.email)
            instance = self.queryset.get(pk=self.request.user.id)
            return instance
        except UserProfile.DoesNotExist:
            raise Http404

# ユーザ削除のView(DELETE)


class AuthInfoDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer
    #lookup_field = 'email'
    queryset = UserProfile.objects.all()

    def get_object(self):
        try:
            #instance = self.queryset.get(email=self.request.user)
            instance = self.queryset.get(pk=self.request.user.id)
            return instance
        except UserProfile.DoesNotExist:
            raise Http404
