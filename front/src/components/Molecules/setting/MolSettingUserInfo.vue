<template>
  <div>
    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">ユーザー名</h2>
        <a
          class="text-bold pl-2 text-sm text-vue-green"
          href="#"
          @click="changeUserName"
          >変更</a
        >
      </div>
      <p class="font-normal text-sm">{{ userInfo["name"] }}</p>
    </div>

    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">Email</h2>
        <a
          class="text-bold pl-2 text-sm text-vue-green"
          href="#"
          @click="changeEmail"
          >変更</a
        >
      </div>
      <p class="font-normal text-sm">{{ userInfo["email"] }}</p>
    </div>

    <div class="pb-6">
      <div class="flex">
        <h2 class="font-bold text-sm pb-3">パスワード</h2>
        <a
          class="text-bold pl-2 text-sm text-vue-green"
          href="#"
          @click="changePassword"
          >変更</a
        >
      </div>
      <p class="font-normal text-sm">セキュリティ上表示されません</p>
    </div>

    <div class="bg-white text-black font-bold">
      <router-link :to="{ name: 'Home' }">
        <AtomButton @click="jwtLogout" :text="'ログアウト'" />
      </router-link>
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
import AtomButton from "@/components/Atoms/AtomButton.vue";

export default defineComponent({
  name: "MolSettingUserInfo",
  components: {
    AtomButton,
  },
  setup(_, context) {
    const store = useStore(key); // $storeではなくuseStore()で取得する

    // ログアウト処理
    const jwtLogout = () => {
      store.commit("jwtReset");
    };

    type Info = {
      id: string;
      name: string;
      email: string;
      is_active: boolean;
      is_staff: boolean;
    };

    const userInfo: Info = store.getters.getUserInfo;

    // どの項目を変更するかをemit
    const changeUserName = () => {
      context.emit("changeDetailInfo", "userName");
    };
    const changeEmail = () => {
      context.emit("changeDetailInfo", "email");
    };
    const changePassword = () => {
      context.emit("changeDetailInfo", "password");
    };

    return {
      userInfo,
      jwtLogout,
      changeUserName,
      changeEmail,
      changePassword,
    };
  },
});
</script>
