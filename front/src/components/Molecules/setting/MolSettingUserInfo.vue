<template>
  <div>
    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">ユーザー名</h2>
        <a class="text-bold pl-2 text-sm text-vue-green" href="#">変更</a>
      </div>
      <p class="font-normal text-sm">{{ userInfo["name"] }}</p>
    </div>

    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">Email</h2>
        <a class="text-bold pl-2 text-sm text-vue-green" href="#">変更</a>
      </div>
      <p class="font-normal text-sm">{{ userInfo["email"] }}</p>
    </div>

    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">パスワード</h2>
        <a class="text-bold pl-2 text-sm text-vue-green" href="#">変更</a>
      </div>
      <p class="font-normal text-sm">セキュリティ上表示されません</p>
    </div>

    <div class="pt-6 pb-6">
      <a class="font-bold text-sm pb-3 text-red-400" href="#">アカウント削除</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "MolSettingUserInfo",
  components: {},
  setup() {
    const store = useStore(key); // $storeではなくuseStore()で取得する

    type Info = {
      id: string;
      name: string;
      email: string;
      is_active: boolean;
      is_staff: boolean;
    };

    const userInfo: Info = store.getters.getUserInfo;

    return {
      userInfo,
    };
  },
});
</script>
