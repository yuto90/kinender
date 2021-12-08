from django.urls import path, include
from .views import UserProfileViewSet, PostDateView, PostDateDetailView, AuthRegister, AuthInfoGetView, AuthInfoUpdateView, AuthInfoDeleteView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# ユーザーのCRUD処理用
router.register('profile', UserProfileViewSet)

urlpatterns = [
    # 投稿の一覧取得, 登録用
    path('post_date/', PostDateView.as_view(), name='post_date'),
    # 投稿の詳細取得, 詳細削除, 詳細更新用
    path('post_date/<str:pk>/', PostDateDetailView.as_view(),
         name='post_date_detail'),
    # ユーザー新規作成
    path('register/', AuthRegister.as_view(), name='auth_register'),
    # ログイン中ユーザーの情報を取得
    path('mypage/', AuthInfoGetView.as_view(), name='mypage'),
    # ログイン中ユーザーの情報を更新
    path('auth_update/', AuthInfoUpdateView.as_view(), name='auth_update'),
    # ログイン中ユーザーの削除
    path('delete/', AuthInfoDeleteView.as_view()),
    # router接続用
    path('', include(router.urls)),
]
