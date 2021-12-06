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
import axios from "axios";

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

    const registerUser = async () => {
      // ユーザー新規登録
      await axios
        .post("http://127.0.0.1:8000/api/register/", {
          name: state.displayInputName,
          email: state.displayInputEmail,
          password: state.displayInputPass,
        })
        .then(async (response) => {
          console.log(response.data);
          await loginUser();
        })
        .catch((error) => {
          //todo 登録失敗エラー画面を出す
          console.log(error);
        });

      // Homeにリダイレクト
      router.push("/");
    };

    // ユーザーログイン
    const loginUser = async () => {
      await axios
        .post("http://127.0.0.1:8000/token/", {
          email: state.displayInputEmail,
          password: state.displayInputPass,
        })
        .then(async (response) => {
          // 認証に成功したらjwtトークンをセット
          store.commit("setToken", "JWT " + response.data["token"]);
          // jwtトークンを元にユーザー情報を取得
          const userInfo = await getUserInfo();
          // 取得したユーザー情報をVuexに保存
          store.commit("setUserInfo", userInfo);
        })
        .catch((error) => {
          //todo ログイン失敗エラー画面を出す
          console.log(error);
        });
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
      //// MypageAPIを叩く
      //const res: Mypage = await callMypageApi();

      const token: string = store.getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      // todo helperから呼ぶ
      const res: Mypage = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/mypage/",
        headers: headers,
      });

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
