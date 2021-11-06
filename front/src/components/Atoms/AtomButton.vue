<template>
  <div class="atom-button">
    <button
      class="material-button contained-button"
      :disabled="disabled"
      :style="buttonStyle"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

type Props = {
  text: string;
  disabled: boolean;
  btnColor: string;
  btnTextColor: string;
};

export default defineComponent({
  name: "AtomButton",
  props: {
    text: {
      type: String,
      required: true,
      default: "ボタンテキスト",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    btnColor: {
      type: String,
      default: "#42b983", // 緑
    },
    btnTextColor: {
      type: String,
      default: "#fff",
    },
  },
  setup(props: Props) {
    const buttonStyle = computed(() => {
      return `background-color: ${props.btnColor}; color: ${props.btnTextColor};`;
    });

    return {
      buttonStyle,
    };
  },
});
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  /* 要素に標準スタイルを適用させない */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.material-button {
  font-family: sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  margin: 4px;
  border-radius: 4px;
}

.material-button.contained-button {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
