<template>
  <header class="header-3">
    <div class="header-inner">
      <div class="text-3xl">
        <router-link
          :to="{ name: 'Home' }"
          style="color: #42b983; text-decoration: none"
        >
          Kinender
        </router-link>
        <span class="text-xs">記念日を記録するアプリ</span>
      </div>

      <div
        v-if="getLoginStatus() == 'login'"
        id="nav"
        class="text-center p-12 font-bold text-vue-black"
      >
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'Add' }">Add</router-link> |
        <router-link :to="{ name: 'Setting' }">Setting</router-link>
      </div>

      <nav class="header-nav">
        <!--todo そのうちマイページにボタンを移動させる -->
        <div v-if="getLoginStatus() == 'no_login'" class="login-nav">
          <div class="login-nav-item">
            <router-link :to="{ name: 'Signin' }">
              <AtomButton :text="'新規登録'" />
            </router-link>
          </div>
          <div class="login-nav-item">
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
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { getLoginStatus, callMypageApi } from "@/helper/helper.ts";

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

    return {
      jwtLogout,
      getLoginStatus,
    };
  },
});
</script>

<style scoped>
.header-3 {
  box-sizing: border-box;
  width: 100%;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 60px;
  padding: 0 0.8em;
  margin: 0 auto;
  font-size: 1.2em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.header-nav {
  display: flex;
  align-items: center;
}

.header-nav-item {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.header-login {
  color: #2c3e50;
}

.login-nav {
  text-align: center;
}

.login-nav-item {
  display: inline-block;
}
</style>
