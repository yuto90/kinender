from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # 管理画面を表示
    path('admin/', admin.site.urls),
    # APIへの入り口
    path('api/', include('api.urls')),
    # ログイントークン取得用
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # トークンを再取得
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('api/auth/',include('djoser.urls')),
    path('api/auth/',include('djoser.urls.jwt')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
