<template>
  <MolSetting />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MolSetting from "../Molecules/setting/MolSetting.vue";

export default defineComponent({
  name: "OrgSetting",
  components: { MolSetting },
  props: {},
  //setup() {},
});
</script>
