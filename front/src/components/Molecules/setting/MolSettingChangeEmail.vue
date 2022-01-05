<template>
  <div class="Form-Item">
    <p class="Form-Item-Label">新しいメールアドレス</p>
    <AtomInput @emitInput="emitInput" placeholder="example@gmail.com" />
  </div>

  <AtomButton
    class="text-center"
    @click="cancel"
    :text="'キャンセル'"
    :btnColor="'white'"
    :btnTextColor="'black'"
  />
  <AtomButton class="text-center" @click="changeEmail" :text="'保存'" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { isVerifyAccessToken } from "@/helper/helper";
import { callAuthUpdateApi, callDjoserRefresh } from "@/model/model";

import AtomInput from "@/components/Atoms/AtomInput.vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";

export default defineComponent({
  name: "MolSettingChangeEmail",
  components: {
    AtomInput,
    AtomButton,
  },
  setup(_, context) {
    const store = useStore(key);

    const state = reactive({
      newEmail: "",
    });

    const emitInput = (inputEmail: string) => {
      state.newEmail = inputEmail;
      console.log(state.newEmail);
    };

    const changeEmail = async () => {
      // アクセストークンの有効期限を確認する
      const isVerify: boolean = await isVerifyAccessToken(store);
      // 期限切れならトークンをリフレッシュ
      if (!isVerify) {
        await callDjoserRefresh(store);
      }

      const data = {
        email: state.newEmail,
      };

      const res = await callAuthUpdateApi(store, data);

      if (res.status === 200) {
        cancel();
      } else {
        alert("エラー: " + res.data);
      }
    };

    // ユーザー情報画面に戻る
    const cancel = () => {
      context.emit("changeDetailInfo", "cancel");
    };

    return {
      emitInput,
      changeEmail,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.Form-Item {
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .Form-Item {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    flex-wrap: wrap;
  }
}
.Form-Item:nth-child(5) {
  border-bottom: 1px solid #ddd;
}
.Form-Item-Label {
  width: 100%;
  max-width: 248px;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 16px;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label {
    max-width: inherit;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
}
.Form-Item-Label.isMsg {
  margin-top: 8px;
  margin-bottom: auto;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label.isMsg {
    margin-top: 0;
  }
}
</style>
