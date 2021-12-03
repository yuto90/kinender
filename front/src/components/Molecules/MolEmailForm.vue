<template>
  <div class="Form-Item">
    <p class="Form-Item-Label">
      <span> <AtomRequired /> </span>メールアドレス
    </p>
    <AtomInput @emitInput="emitEmail" placeholder="example@gmail.com" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AtomInput from "@/components/Atoms/AtomInput.vue";
import AtomRequired from "../Atoms/AtomRequired.vue";

export default defineComponent({
  name: "MolEmailForm",
  components: {
    AtomInput,
    AtomRequired,
  },
  setup(_, context) {
    const emitEmail = (inputEmail: string) => {
      context.emit("emitEmail", inputEmail);
    };

    return {
      emitEmail,
    };
  },
});
</script>

<style lang="scss" scoped>
.Form-Item {
  border-top: 1px solid #ddd;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .Form-Item {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    flex-wrap: wrap;
  }
}
.Form-Item:nth-child(5) {
  border-bottom: 1px solid #ddd;
}
.Form-Item-Label {
  width: 100%;
  max-width: 248px;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 16px;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label {
    max-width: inherit;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
}
.Form-Item-Label.isMsg {
  margin-top: 8px;
  margin-bottom: auto;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label.isMsg {
    margin-top: 0;
  }
}
</style>
