from django.db import models
from django.conf import settings

# AbstractBaseUserを利用してUserモデルをカスタマイズ
from django.contrib.auth.models import AbstractBaseUser

# PermissionsMixinを用いてUserの認証を行う
from django.contrib.auth.models import PermissionsMixin

# BaseUserManager利用してUserManagerモデルをカスタマイズ
from django.contrib.auth.models import BaseUserManager

import uuid
import os

from config.settings import MEDIA_ROOT


class UserProfileManager(BaseUserManager):
    """ カスタムユーザーマネージャー """

    # ユーザを作成するメソッド
    def create_user(self, email, name, password=None):
        """ ユーザー作成 """

        if not email:
            raise ValueError('User must have an email address')

        # emailのドメインを小文字に変換
        email = self.normalize_email(email)

        # UserProfileモデルを参照してuserを定義
        user = self.model(email=email, name=name)

        # userが入力したパスワードをハッシュ化
        user.set_password(password)

        # settings.pyでdefaultに設定されているDBに保存
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """ スーパーユーザー作成 """

        # 上記create_userを利用
        user = self.create_user(email, name, password)

        # superuserの権限を適用
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """ カスタムユーザーモデル """

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    # ユーザが退会したらfalseにして論理削除
    is_active = models.BooleanField(default=True)

    # 管理画面にアクセスを許可するか
    is_staff = models.BooleanField(default=False)

    # UserProfileManagerのメソッドを使えるようにする
    objects = UserProfileManager()

    # emailを利用したログイン認証に変更
    USERNAME_FIELD = 'email'

    # 必須項目追加
    REQUIRED_FIELDS = ['name']

    # 1つのnameフィールドで表示したいので、既存のメソッドをオーバーライド
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    # 管理画面などで表示される文字列を定義
    def __str__(self):
        return self.name


class PostDate(models.Model):

    def get_image_path(self, filename):
        """カスタマイズした画像パスを取得する.

        :param self: インスタンス (models.Model)
        :param filename: 元ファイル名
        :return: カスタマイズしたファイル名を含む画像パス
        """
        prefix = 'images/'
        name = str(uuid.uuid4()).replace('-', '')
        extension = os.path.splitext(filename)[-1]
        return prefix + name + extension

    def delete_previous_file(function):
        """不要となる古いファイルを削除する為のデコレータ実装.

        :param function: メイン関数
        :return: wrapper
        """
        def wrapper(*args, **kwargs):
            """Wrapper 関数.

            :param args: 任意の引数
            :param kwargs: 任意のキーワード引数
            :return: メイン関数実行結果
            """
            self = args[0]

            # 保存前のファイル名を取得
            result = PostDate.objects.filter(pk=self.pk)
            previous = result[0] if len(result) else None
            super(PostDate, self).save()

            # 関数実行
            result = function(*args, **kwargs)

            # 保存前のファイルがあったら削除
            if previous:
                os.remove(MEDIA_ROOT + '/' + previous.image.name)
            return result
        return wrapper

    @delete_previous_file
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super(PostDate, self).save()

    @delete_previous_file
    def delete(self, using=None, keep_parents=False):
        super(PostDate, self).delete()


    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    date = models.DateField(blank=False, null=False)
    title = models.CharField(blank=False, null=False, max_length=150)
    memo = models.TextField(blank=True)
    image = models.ImageField('画像', upload_to=get_image_path, blank=True)
    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)
    # 外部キー
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title
