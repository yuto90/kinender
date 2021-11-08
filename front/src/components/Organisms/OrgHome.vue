<template>
  <div id="org-home">
    <div v-if="getLoginStatus() == 'no_login'">
      <MolHomeNoLogin />
    </div>
    <div v-else-if="state.currentView === 'MolHomeTable'">
      <MolHomeTable @emitDetail="transitionDetail" />
    </div>
    <div v-else-if="state.currentView === 'MolHomeDetail'">
      <MolHomeDetail @emitTable="transitionTable" :index="state.index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getLoginStatus } from "@/helper/helper.ts";
import MolHomeNoLogin from "@/components/Molecules/home/MolHomeNoLogin.vue";
import MolHomeTable from "@/components/Molecules/home/MolHomeTable.vue";
import MolHomeDetail from "@/components/Molecules/home/MolHomeDetail.vue";

export default defineComponent({
  name: "OrgHome",
  components: {
    MolHomeNoLogin,
    MolHomeTable,
    MolHomeDetail,
  },
  props: {},
  setup() {
    const state = reactive({
      currentView: "MolHomeTable", // Home画面のデフォルト表示コンポーネント
      index: "",
    });

    const transitionTable = (): void => {
      state.currentView = "MolHomeTable";
    };

    // 子コンポーネントからの引数は指定した親コンポーネントの関数の引数に伝達される
    const transitionDetail = (index: string): void => {
      state.index = index;
      state.currentView = "MolHomeDetail";
    };
    return {
      state,
      transitionTable,
      transitionDetail,
      getLoginStatus,
    };
  },
});
</script>
