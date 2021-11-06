<template>
  <MolHeader />
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Add' }">Add</router-link> |
    <router-link :to="{ name: 'Setting' }">Setting</router-link>
  </div>
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
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
