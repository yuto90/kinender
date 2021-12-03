<template>
  <div class="p-8">
    <table class="table-fixed w-2/5 mx-auto border-separate">
      <thead></thead>
      <tbody>
        <tr>
          <td
            width="25%"
            v-on:click="selectUserInfo"
            class="break-words pt-4 pb-4 setting-display"
          >
            ユーザー情報
          </td>
          <td
            valign="top"
            rowspan="10"
            class="break-words p-12 setting-display"
          >
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

export default defineComponent({
  name: "MolSetting",
  components: { MolSettingUserInfo, MolSettingKari },
  setup() {
    const state = reactive({
      currentView: "MolSettingUserInfo",
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
