<template>
  <div>
    <input
      class="border-solid border-2 border-grey"
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
