<template>
  <div class="mol-home-nologin">ログインしてね</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MolHomeNoLogin",
  components: {},
});
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  width: 30%; /* テーブルのセル幅固定 */
  margin-left: auto;
  margin-right: auto;
  //border: 3px solid #42b983;
  text-align: center;
}

.column {
  word-wrap: break-word; // 改行させる設定
  padding: 50px 0px;
}
</style>
