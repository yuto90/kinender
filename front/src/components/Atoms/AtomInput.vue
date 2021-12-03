<template>
  <div>
    <input
      class="atom-input"
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

<style lang="scss" scoped>
.atom-input {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 40px;
  padding-left: 1em;
  padding-right: 1em;
  height: 48px;
  flex: 1;
  width: 100%;
  max-width: 410px;
  background: #eaedf2;
  font-size: 16px;
}
@media screen and (max-width: 480px) {
  .atom-input {
    margin-left: 0;
    margin-top: 16px;
    height: 40px;
    flex: inherit;
    font-size: 15px;
  }
}
</style>
