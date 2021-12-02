<template>
  <div class="p-8">
    <table class="table-fixed w-6/12 mx-auto text-center border-separate">
      <thead></thead>
      <tbody>
        <tr>
          <td class="break-words pt-4 pb-4 setting-display">
            ユーザー情報設定
          </td>
          <td rowspan="10" class="break-words p-4 setting-display">
            aaaaaaaaaaa
          </td>
        </tr>
        <!-- 左側 -->
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
        <tr>
          <td class="break-words pt-8 pb-8"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import { useStore } from "vuex";
//import { key } from "@/store";
//import axios from "axios";

//import AtomButton from "@/components/Atoms/AtomButton.vue";
//import AtomInput from "@/components/Atoms/AtomInput.vue";
//import AtomInputDate from "@/components/Atoms/AtomInputDate.vue";
//import AtomTextarea from "@/components/Atoms/AtomTextarea.vue";

export default defineComponent({
  name: "MolSetting",
  components: {},
  //setup() {},
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
