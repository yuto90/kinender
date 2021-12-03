<template>
  <div class="p-8">
    <div class="text-center">
      <h2>ユーザー情報の変更</h2>
    </div>

    <MolEmailForm @emitEmail="setInputEmail" />

    <MolPassForm @emitPass="setInputPass" />

    <AtomButton class="text-center" @click="loginUser" :text="'更新'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import axios from "axios";

import AtomButton from "@/components/Atoms/AtomButton.vue";

import MolEmailForm from "@/components/Molecules/MolEmailForm.vue";
import MolPassForm from "@/components/Molecules/MolPassForm.vue";

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
        .then((response) => {
          store.commit("setToken", "JWT " + response.data["token"]);
          console.log(response.data);
        })
        .catch((error) => console.log(error));

      // Homeにリダイレクト
      router.push("/");
    };

    return {
      setInputEmail,
      setInputPass,
      loginUser,
    };
  },
});
</script>
