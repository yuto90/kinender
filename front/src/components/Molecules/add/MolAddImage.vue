<template>
  <div>
    <h2>その時の画像を設定してみてね</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "MolAddThird",
  components: {},
  setup() {
    const store = useStore(key);
  },
});
</script>
