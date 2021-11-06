from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # 管理画面を表示
    path('admin/', admin.site.urls),
    # APIへの入り口
    path('api/', include('api.urls')),
    # ログイントークン取得用
    path('login/', obtain_jwt_token),
]
