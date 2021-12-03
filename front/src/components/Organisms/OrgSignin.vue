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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));

      // ユーザーログイン
      await axios
        .post("http://127.0.0.1:8000/login/", {
          email: state.displayInputEmail,
          password: state.displayInputPass,
        })
        .then((response) => {
          store.commit("setToken", "JWT " + response.data["token"]);
        })
        .catch((error) => console.log(error));

      // Homeにリダイレクト
      router.push("/");
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

<style lang="scss" scoped>
//#org-signin {
//.Form {
//margin-left: auto;
//margin-right: auto;
//max-width: 720px;
//}
//@media screen and (max-width: 480px) {
//.Form {
//margin-top: 40px;
//}
//}
//.Form-Word {
//text-align: center;
//}
//.form-register-button {
//text-align: center;
//}
//}
</style>
