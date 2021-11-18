from rest_framework import serializers
from .models import PostDate, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:

        # Serializersに紐付けるmodelを定義
        model = UserProfile

        # APIとして出力したいカラムを定義（タプル形式）
        fields = ('id', 'email', 'name', 'password')

        #　fieldsの制限設定(定義したカラム名をkeyに取る)
        extra_kwargs = {
            'password': {

                # セキュリティの関係上パスワードは書き込むだけ。
                'write_only': True,

                # パスワード入力の際に「・・・」となるようにstyleを指定
                'style': {'input_type': 'password'}
            }
        }

    # ModelSerializerにデフォルトで実装されているメソッドをオーバーライド(パスワードのハッシュ化処理)
    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
        )
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)


class PostDateSerializer(serializers.ModelSerializer):
    # API返却値のフォーマットを見やすくする
    # created_datetime = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    # updated_datetime = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    # GETした時に展開する為にauthorのserializerを上書き
    # read_onlyにするとpost時には表示されない(出力用)
    author = UserProfileSerializer(read_only=True)
    # white_onlyにするとget時には表示されない(入力用)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(), write_only=True)

    # author_idカラムがモデルに存在しないよエラー対策にcreateメソッドをオーバーライド
    def create(self, validated_date):
        validated_date['author'] = validated_date.get('author_id', None)

        if validated_date['author'] is None:
            raise serializers.ValidationError("user not found.")

        del validated_date['author_id']

        return PostDate.objects.create(**validated_date)

    class Meta:
        model = PostDate
        fields = ('id', 'date', 'title', 'memo', 'created_datetime',
                  'updated_datetime', 'author', 'author_id',)
