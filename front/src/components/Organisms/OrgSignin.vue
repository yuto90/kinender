<template>
  <div class="ml-auto mr-auto w-6/12 mt-32">
    <div class="text-center">
      <h2>新規登録</h2>
    </div>

    <MolNameForm @emitInput="setInputName" />

    <MolEmailForm @emitEmail="setInputEmail" />

    <MolPassForm @emitPass="setInputPass" />

    <div class="text-center">
      <MolValidateBox :errorMessage="errorM" />
    </div>

    <AtomButton class="text-center" @click="registerUser" :text="'新規登録'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import {
  callDjoserCreateApi,
  callMypageApi,
  callRegisterApi,
} from "@/model/model";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import MolValidateBox from "@/components/Molecules/MolValidateBox.vue";
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
    MolValidateBox,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const state = reactive({
      displayInputName: "",
      displayInputEmail: "",
      displayInputPass: "",
    });

    // エラーメッセージ格納用
    let errorM = ref<string>("");

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
      if (
        state.displayInputName === "" ||
        state.displayInputEmail === "" ||
        state.displayInputPass === ""
      ) {
        errorM.value =
          "「ユーザー名」と「メールアドレス」と「パスワード」を入力してください。";
        return;
      }

      let response;
      try {
        response = await callRegisterApi(
          store,
          state.displayInputName,
          state.displayInputEmail,
          state.displayInputPass
        );
      } catch (e) {
        // todo 詳細なエラーハンドリング
        errorM.value = "登録に失敗しました。";
        return;
      }

      if (response.status === 201) {
        // 登録処理に成功したらログイン
        await loginUser();
        // Homeにリダイレクト
        router.push("/");
      }
    };

    // ユーザーログイン
    const loginUser = async () => {
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
      setInputName,
      setInputEmail,
      setInputPass,
      registerUser,
      errorM,
    };
  },
});
</script>
