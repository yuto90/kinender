<template>
  <div>
    <input
      class="atom-pass"
      :placeholder="placeholder"
      :size="size"
      v-model="state.value"
      @change="inputChange"
      type="password"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

type Props = {
  placeholder: string;
  size: string;
  defaultTitle: string;
  whereComp: string;
};

export default defineComponent({
  name: "AtomPass",
  props: {
    placeholder: { type: String, default: "hint" },
    size: { type: String, default: "30" },
    defaultTitle: { type: String, default: "" },
    whereComp: { type: String, default: "" },
  },
  emits: ["emitInput"],
  setup(props: Props, context) {
    const state = reactive({
      value: props.defaultTitle,
    });

    const inputChange = () => {
      //whereComp: AtomPassを複数使用してるコンポーネントから入力があったときにどこのemit関数に返すか判別できるようにする
      context.emit("emitInput", state.value, props.whereComp);
    };

    return {
      state,
      inputChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.atom-pass {
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
  .atom-pass {
    margin-left: 0;
    margin-top: 16px;
    height: 40px;
    flex: inherit;
    font-size: 15px;
  }
}
</style>
