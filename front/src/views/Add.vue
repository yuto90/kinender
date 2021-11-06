<template>
  <div class="add">
    <OrgAdd />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrgAdd from "@/components/Organisms/OrgAdd.vue";

export default defineComponent({
  name: "Add",
  components: {
    OrgAdd,
  },
});
</script>
