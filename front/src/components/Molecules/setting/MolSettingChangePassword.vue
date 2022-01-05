<template>
  <div class="Form-Item">
    <p class="Form-Item-Label">現在のパスワード</p>
    <AtomPass @emitInput="emitInput" placeholder="" whereComp="nowPass" />
  </div>
  <div class="Form-Item">
    <p class="Form-Item-Label">新しいパスワード</p>
    <AtomPass @emitInput="emitInput" placeholder="" whereComp="newPass" />
  </div>
  <div class="Form-Item">
    <p class="Form-Item-Label">新しいパスワードの再入力</p>
    <AtomPass @emitInput="emitInput" placeholder="" whereComp="reNewPass" />
  </div>

  <AtomButton
    class="text-center"
    @click="cancel"
    :text="'キャンセル'"
    :btnColor="'white'"
    :btnTextColor="'black'"
  />
  <AtomButton class="text-center" @click="changePass" :text="'保存'" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { isVerifyAccessToken } from "@/helper/helper";
import { useStore } from "vuex";
import { key } from "@/store";
import { callAuthUpdateApi, callDjoserRefresh } from "@/model/model";
import AtomPass from "@/components/Atoms/AtomPass.vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";

export default defineComponent({
  name: "MolPassForm",
  components: {
    AtomPass,
    AtomButton,
  },
  setup(_, context) {
    const store = useStore(key);

    const state = reactive({
      nowPass: "",
      newPass: "",
      reNewPass: "",
    });

    const emitInput = (inputPass: string, whereComp: string) => {
      if (whereComp === "nowPass") {
        state.nowPass = inputPass;
      } else if (whereComp === "newPass") {
        state.newPass = inputPass;
      } else {
        state.reNewPass = inputPass;
      }
    };

    const changePass = async () => {
      //todo 現在のパスワードもチェックする
      if (state.newPass === state.reNewPass) {
        // アクセストークンの有効期限を確認する
        const isVerify: boolean = await isVerifyAccessToken(store);
        // 期限切れならトークンをリフレッシュ
        if (!isVerify) {
          await callDjoserRefresh(store);
        }

        const data = {
          password: state.newPass,
        };

        const res = await callAuthUpdateApi(store, data);

        if (res.status === 200) {
          cancel();
        } else {
          alert("エラー: " + res.data);
        }
      } else {
        alert("パスワードと再入力が一致しません。");
      }
    };

    // ユーザー情報画面に戻る
    const cancel = () => {
      context.emit("changeDetailInfo", "cancel");
    };

    return {
      emitInput,
      changePass,
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
