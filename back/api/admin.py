from django.contrib import admin
from .models import PostDate, UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    # 一覧表示画面のフィールド
    list_display = ('name', 'email', 'is_active', 'is_staff')
    # フィールドをリンク化
    list_display_links = ('name', 'email')


class PostDateAdmin(admin.ModelAdmin):
    list_display = ('date', 'title', 'memo', 'created_datetime',
                    'updated_datetime', 'author')
    list_display_links = ('title', 'date', 'memo')


# 管理画面に登録
admin.site.register(PostDate, PostDateAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
