<template>
  <div class="mol-add-second">
    <h2>それは何の日？</h2>
    <AtomInput @emitInput="emitInput" placeholder="例：次の資格試験日" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import AtomInput from "@/components/Atoms/AtomInput.vue";

export default defineComponent({
  name: "MolAddSecond",
  components: {
    AtomInput,
  },
  setup() {
    const store = useStore(key);

    const emitInput = (emitTitle: string): void => {
      store.commit("setTitle", emitTitle);
    };

    return {
      emitInput,
    };
  },
});
</script>

<style scoped></style>
