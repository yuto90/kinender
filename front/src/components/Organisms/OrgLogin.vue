<template>
  <div class="ml-auto mr-auto w-6/12 mt-32">
    <div class="text-center">
      <h2>ログイン</h2>
    </div>

    <MolEmailForm @emitEmail="setInputEmail" />

    <MolPassForm @emitPass="setInputPass" />

    <AtomButton class="text-center" @click="loginUser" :text="'ログイン'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import axios from "axios";
import MolEmailForm from "@/components/Molecules/MolEmailForm.vue";
import MolPassForm from "@/components/Molecules/MolPassForm.vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";
//import { callMypageApi } from "@/helper/helper";

export default defineComponent({
  name: "OrgLogin",
  components: {
    AtomButton,
    MolEmailForm,
    MolPassForm,
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

    const loginUser = async () => {
      // ユーザーログイン
      await axios
        .post("http://127.0.0.1:8000/login/", {
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
      // Homeにリダイレクト
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
      setInputEmail,
      setInputPass,
      loginUser,
    };
  },
});
</script>
