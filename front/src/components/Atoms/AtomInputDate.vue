<template>
  <div>
    <input
      class="atom-input-date"
      type="date"
      v-model="state.value"
      @change="inputDate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

type Props = {
  defaultDate: string;
};

export default defineComponent({
  name: "AtomInputDate",
  props: {
    defaultDate: {
      type: String,
      default: "",
    },
  },
  setup(props: Props, context) {
    const state = reactive({
      value: props.defaultDate,
    });

    const inputDate = (): void => {
      context.emit("emitInputDate", state.value);
    };

    onMounted(() => {
      context.emit("emitInputDate", state.value);
    });

    return {
      state,
      inputDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.atom-input-date {
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
  .atom-input-date {
    margin-left: 0;
    margin-top: 16px;
    height: 40px;
    flex: inherit;
    font-size: 15px;
  }
}
</style>
