<template>
  <div class="signin">
    <OrgSignin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrgSignin from "@/components/Organisms/OrgSignin.vue";

export default defineComponent({
  name: "Signin",
  components: {
    OrgSignin,
  },
});
</script>
