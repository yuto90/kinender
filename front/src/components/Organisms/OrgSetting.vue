import MolSettingKari from
"../Molecules/setting/MolSettingKari.vue_________module";

<template>
  <div class="p-8">
    <table class="table-fixed w-9/12 mx-auto border-separate">
      <thead></thead>
      <tbody>
        <tr>
          <td
            width="25%"
            v-on:click="selectUserInfo"
            class="break-words pt-4 pb-4 setting-display"
          >
            ユーザー情報設定
          </td>
          <td rowspan="10" class="break-words p-4 setting-display">
            <keep-alive>
              <component :is="state.currentView" />
            </keep-alive>
          </td>
        </tr>
        <!-- 左側 -->
        <tr>
          <td
            v-on:click="selectKari"
            class="break-words pt-4 pb-4 setting-display"
          >
            その他
          </td>
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
import MolSettingTop from "../Molecules/setting/MolSettingTop.vue";

export default defineComponent({
  name: "MolSetting",
  components: { MolSettingUserInfo, MolSettingKari, MolSettingTop },
  setup() {
    const state = reactive({
      currentView: "MolSettingTop",
    });

    const selectUserInfo = () => {
      state.currentView = "MolSettingUserInfo";
    };

    const selectKari = () => {
      state.currentView = "MolSettingKari";
    };

    return {
      state,
      selectKari,
      selectUserInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  border-spacing: 10px;
}
.setting-display {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
