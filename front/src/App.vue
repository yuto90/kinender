<template>
  <MolHeader />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MolHeader from "@/components/Molecules/MolHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    MolHeader,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
