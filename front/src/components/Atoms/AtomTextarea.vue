<template>
  <div class="atom-textarea">
    <textarea
      :placeholder="placeholder"
      :cols="cols"
      :rows="rows"
      v-model="state.value"
      @change="inputChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

type Props = {
  placeholder: string;
  cols: string;
  rows: string;
  defaultText: string;
};

export default defineComponent({
  name: "AtomTextarea",
  props: {
    placeholder: { type: String, default: "hint" },
    cols: { type: String, default: "30" },
    rows: { type: String, default: "7" },
    defaultText: { type: String, default: "" },
  },
  setup(props: Props, context) {
    const state = reactive({
      // v-modelによって入力される度に更新されていく
      value: props.defaultText,
    });

    // 入力される度に値をMolAddThirdにEmitする
    const inputChange = () => {
      context.emit("emitTextarea", state.value);
    };

    onMounted(() => {
      context.emit("emitTextarea", state.value);
    });

    return {
      state,
      inputChange,
    };
  },
});
</script>

<style scoped></style>
