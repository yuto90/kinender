<template>
  <div class="login">
    <OrgLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrgLogin from "@/components/Organisms/OrgLogin.vue";

export default defineComponent({
  name: "Login",
  components: {
    OrgLogin,
  },
});
</script>
