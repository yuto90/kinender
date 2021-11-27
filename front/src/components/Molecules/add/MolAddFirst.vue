<template>
  <div>
    <h2>日付を入力してね</h2>
    <AtomInputDate @emitInputDate="emitInputDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import AtomInputDate from "@/components/Atoms/AtomInputDate.vue";

export default defineComponent({
  name: "MolAddFirst",
  components: {
    AtomInputDate,
  },
  setup() {
    const store = useStore(key);

    const emitInputDate = (emitDate: string) => {
      store.commit("setDate", emitDate);
    };

    return {
      emitInputDate,
    };
  },
});
</script>
