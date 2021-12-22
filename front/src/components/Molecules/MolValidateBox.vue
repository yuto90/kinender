<template>
  <div class="text-red-500">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MolValidateBox",
  components: {},
  props: {
    errorMessage: {
      type: String,
      required: true,
      default: "",
    },
  },
});
</script>
