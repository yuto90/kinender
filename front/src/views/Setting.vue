<template>
  <div class="setting">
    <OrgSetting />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrgSetting from "@/components/Organisms/OrgSetting.vue";

export default defineComponent({
  name: "Setting",
  components: { OrgSetting },
});
</script>
