<template>
  <div class="p-8">
    <table class="table-fixed w-2/4 mx-auto border-separate">
      <thead></thead>
      <tbody>
        <tr>
          <td
            width="25%"
            v-on:click="selectUserInfo"
            :class="state.userInfoClass"
          >
            ユーザー情報
          </td>
          <td valign="top" rowspan="10" class="break-words p-12 shadow">
            <keep-alive>
              <component
                :is="state.currentView"
                @changeDetailInfo="changeDetailInfo"
              />
            </keep-alive>
          </td>
        </tr>
        <!-- 左側 -->
        <tr>
          <td v-on:click="selectKari" :class="state.sonotaClass">その他</td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import MolSettingUserInfo from "../Molecules/setting/MolSettingUserInfo.vue";
import MolSettingKari from "../Molecules/setting/MolSettingKari.vue";
import MolSettingChangeUserName from "../Molecules/setting/MolSettingChangeUserName.vue";
import MolSettingChangeEmail from "../Molecules/setting/MolSettingChangeEmail.vue";
import MolSettingChangePassword from "../Molecules/setting/MolSettingChangePassword.vue";

export default defineComponent({
  name: "MolSetting",
  components: {
    MolSettingUserInfo,
    MolSettingKari,
    MolSettingChangeUserName,
    MolSettingChangeEmail,
    MolSettingChangePassword,
  },
  setup() {
    const state = reactive({
      currentView: "MolSettingUserInfo",
      userInfoClass:
        "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200 font-bold border-l-4 border-vue-green",
      sonotaClass: "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200",
    });

    // 「ユーザー情報」クリック時の挙動
    const selectUserInfo = () => {
      state.currentView = "MolSettingUserInfo";
      state.userInfoClass =
        "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200 font-bold border-l-4 border-vue-green";
      state.sonotaClass =
        "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200";
    };

    // 「その他」クリック時の挙動
    const selectKari = () => {
      state.currentView = "MolSettingKari";
      state.userInfoClass =
        "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200";
      state.sonotaClass =
        "break-words cursor-pointer pt-2 pb-2 hover:bg-gray-200 font-bold border-l-4 border-vue-green";
    };

    // 各詳細情報の変更画面に遷移
    const changeDetailInfo = (detail: string) => {
      if (detail === "userName") {
        state.currentView = "MolSettingChangeUserName";
      } else if (detail === "email") {
        state.currentView = "MolSettingChangeEmail";
      } else if (detail === "password") {
        state.currentView = "MolSettingChangePassword";
      }
    };

    return {
      state,
      selectKari,
      selectUserInfo,
      changeDetailInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  border-spacing: 10px;
}
.shadow {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
