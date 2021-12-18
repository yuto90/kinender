<template>
  <div class="ml-auto mr-auto w-6/12 mt-32">
    <div class="text-center">
      <h2>新規登録</h2>
    </div>

    <MolNameForm @emitInput="setInputName" />

    <MolEmailForm @emitEmail="setInputEmail" />

    <MolPassForm @emitPass="setInputPass" />

    <AtomButton class="text-center" @click="registerUser" :text="'新規登録'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import {
  callDjoserCreateApi,
  callMypageApi,
  callRegisterApi,
} from "@/model/model";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import MolNameForm from "@/components/Molecules/MolNameForm.vue";
import MolEmailForm from "@/components/Molecules/MolEmailForm.vue";
import MolPassForm from "@/components/Molecules/MolPassForm.vue";

export default defineComponent({
  name: "OrgSignin",
  components: {
    AtomButton,
    MolNameForm,
    MolEmailForm,
    MolPassForm,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const state = reactive({
      displayInputName: "",
      displayInputEmail: "",
      displayInputPass: "",
    });

    const setInputName = (inputName: string) => {
      state.displayInputName = inputName;
    };

    const setInputEmail = (inputEmail: string) => {
      state.displayInputEmail = inputEmail;
    };

    const setInputPass = (inputPass: string) => {
      state.displayInputPass = inputPass;
    };

    // ユーザー新規登録
    const registerUser = async () => {
      await callRegisterApi(
        store,
        state.displayInputName,
        state.displayInputEmail,
        state.displayInputPass
      );
      await loginUser();

      // Homeにリダイレクト
      router.push("/");
    };

    // ユーザーログイン
    const loginUser = async () => {
      const response = await callDjoserCreateApi(
        store,
        state.displayInputEmail,
        state.displayInputPass
      );

      if (response.status === 200) {
        // 認証に成功したらaccessトークンとrefreshトークンをVuexに保存
        store.commit("setAccessToken", "JWT " + response.data["access"]);
        store.commit("setRefreshToken", "JWT " + response.data["refresh"]);
        // jwtトークンを元にユーザー情報を取得
        const userInfo = await getUserInfo();
        // 取得したユーザー情報をVuexに保存
        store.commit("setUserInfo", userInfo);
      }

      //todo 認証失敗したらログイン失敗エラー画面を出す
      router.push("/");
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
      setInputName,
      setInputEmail,
      setInputPass,
      registerUser,
    };
  },
});
</script>
