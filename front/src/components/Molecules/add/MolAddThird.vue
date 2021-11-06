<template>
  <div class="mol-add-third">
    <h2>メモとかあれば書いてみてね ※任意</h2>
    <AtomTextarea
      @emitTextarea="emitTextarea"
      placeholder="例：絶対に合格する!!"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import AtomTextarea from "@/components/Atoms/AtomTextarea.vue";

export default defineComponent({
  name: "MolAddThird",
  components: {
    AtomTextarea,
  },
  setup() {
    const store = useStore(key);

    // emitされてきたテキストをVuexに格納
    // emitされてきた引数をtextで受け取り
    const emitTextarea = (emitText: string) => {
      store.commit("setMemo", emitText);
    };

    return {
      emitTextarea,
    };
  },
});
</script>

<style scoped></style>
