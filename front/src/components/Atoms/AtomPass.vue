<template>
  <div class="atom-pass">
    <input
      :placeholder="placeholder"
      :size="size"
      v-model="state.value"
      @change="inputChange"
      type="password"
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
  name: "AtomPass",
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
