<template>
  <div class="atom-input">
    <input
      :placeholder="placeholder"
      :size="size"
      v-model="state.value"
      @change="inputChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

type Props = {
  placeholder: string;
  size: string;
  defaultTitle: string;
};

export default defineComponent({
  name: "AtomInput",
  props: {
    placeholder: { type: String, default: "hint" },
    size: { type: String, default: "30" },
    defaultTitle: { type: String, default: "" },
  },
  setup(props: Props, context) {
    const state = reactive({
      value: props.defaultTitle,
    });

    const inputChange = () => {
      context.emit("emitInput", state.value);
    };

    onMounted(() => {
      context.emit("emitInput", state.value);
    });

    return {
      state,
      inputChange,
    };
  },
});
</script>

<style scoped></style>
