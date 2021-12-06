<template>
  <div class="home">
    <OrgHome />
    <router-link :to="{ name: 'Add' }">
      <div class="m-3">
        <button
          class="
            fixed
            bottom-8
            right-8
            w-14
            h-14
            bg-vue-green
            text-lg text-white
            font-semibold
            rounded-full
            hover:bg-green-200
          "
        >
          ＋
        </button>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrgHome from "@/components/Organisms/OrgHome.vue";

export default defineComponent({
  name: "Home",
  components: {
    OrgHome,
  },
});
</script>
