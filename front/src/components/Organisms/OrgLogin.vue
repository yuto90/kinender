<template>
  <div class="ml-auto mr-auto w-6/12 mt-32">
    <div class="text-center">
      <h2>ログイン</h2>
    </div>

    <MolEmailForm @emitEmail="setInputEmail" />

    <MolPassForm @emitPass="setInputPass" />

    <div class="text-center">
      <MolValidateBox :errorMessage="errorM" />
    </div>

    <AtomButton class="text-center" @click="loginUser" :text="'ログイン'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { callDjoserCreateApi, callMypageApi } from "@/model/model";
import MolValidateBox from "@/components/Molecules/MolValidateBox.vue";
import MolEmailForm from "@/components/Molecules/MolEmailForm.vue";
import MolPassForm from "@/components/Molecules/MolPassForm.vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";

export default defineComponent({
  name: "OrgLogin",
  components: {
    AtomButton,
    MolEmailForm,
    MolPassForm,
    MolValidateBox,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const state = reactive({
      displayInputEmail: "",
      displayInputPass: "",
    });

    const setInputEmail = (inputEmail: string) => {
      state.displayInputEmail = inputEmail;
    };

    const setInputPass = (inputPass: string) => {
      state.displayInputPass = inputPass;
    };

    // エラーメッセージ格納用
    let errorM = ref<string>("");

    // ユーザーログイン
    const loginUser = async () => {
      if (state.displayInputEmail === "" || state.displayInputPass === "") {
        errorM.value = "「メールアドレス」と「パスワード」を入力してください。";
        return;
      }

      let response;
      try {
        response = await callDjoserCreateApi(
          store,
          state.displayInputEmail,
          state.displayInputPass
        );
      } catch (e) {
        errorM.value =
          "認証に失敗しました。正しいメールアドレスとパスワードを入力してください。";
        return;
      }

      if (response.status === 200) {
        // 認証に成功したらaccessトークンとrefreshトークンをVuexに保存
        store.commit("setAccessToken", "JWT " + response.data["access"]);
        store.commit("setRefreshToken", "JWT " + response.data["refresh"]);
        // jwtトークンを元にユーザー情報を取得
        const userInfo = await getUserInfo();
        // 取得したユーザー情報をVuexに保存
        store.commit("setUserInfo", userInfo);
        router.push("/");
      }
    };

    // ログイン中ユーザー情報を返却する
    const getUserInfo = async () => {
      type Mypage = {
        data: {
          id: string;
          name: string;
          email: string;
          is_active: boolean;
          is_staff: boolean;
        };
      };

      // MypageAPIを叩く
      const res: Mypage = await callMypageApi(store);

      return res["data"];
    };

    return {
      setInputEmail,
      setInputPass,
      loginUser,
      errorM,
    };
  },
});
</script>
