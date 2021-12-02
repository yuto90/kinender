<template>
  <header class="box-border w-full">
    <div
      class="
        header-inner
        flex
        items-center
        justify-between
        w-full
        h-16
        p-3.5
        m-auto
        text-xl
      "
    >
      <div class="text-3xl">
        <router-link
          :to="{ name: 'Home' }"
          style="color: #42b983; text-decoration: none"
        >
          Kinendar
        </router-link>
        <span class="text-xs">Web版</span>
      </div>

      <div
        v-if="getLoginStatus() == 'login'"
        id="nav"
        class="text-center font-bold text-vue-black"
      >
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'Add' }">Add</router-link> |
        <router-link :to="{ name: 'Setting' }">Setting</router-link>
      </div>

      <nav>
        <!--todo そのうちマイページにボタンを移動させる -->
        <div v-if="getLoginStatus() == 'no_login'" class="flex text-center">
          <div class="flex items-center ml-5">
            <router-link :to="{ name: 'Signin' }">
              <AtomButton :text="'新規登録'" />
            </router-link>
          </div>
          <div class="flex items-center ml-5">
            <router-link :to="{ name: 'Login' }">
              <AtomButton
                :text="'ログイン'"
                btnColor="white"
                btnTextColor="#2c3e50"
              />
            </router-link>
          </div>
        </div>
        <div v-else class="inline-flex">
          <div v-if="error !== ''">
            {{ error }}
          </div>
          <Suspense>
            <template #default>
              <MolUserName />
            </template>
            <template #fallback> Loading... </template>
          </Suspense>
          <div class="bg-white text-black font-bold">
            <router-link :to="{ name: 'Home' }">
              <AtomButton @click="jwtLogout" :text="'ログアウト'" />
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, Ref, ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { getLoginStatus } from "@/helper/helper.ts";

import AtomButton from "@/components/Atoms/AtomButton.vue";
import MolUserName from "@/components/Molecules/MolUserName.vue";

export default defineComponent({
  name: "MolHeader",
  components: {
    AtomButton,
    MolUserName,
  },
  setup() {
    // storeに接続
    const store = useStore(key);

    // ログアウト処理
    const jwtLogout = () => {
      store.commit("jwtReset");
    };

    const error: Ref<string> = ref("");

    // Suspenseで発生したエラーをキャッチする
    onErrorCaptured((e: string) => {
      error.value = e;
      return true;
    });

    return {
      jwtLogout,
      getLoginStatus,
      error,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-inner {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
