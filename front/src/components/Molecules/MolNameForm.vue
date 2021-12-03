<template>
  <div class="Form-Item">
    <p class="Form-Item-Label">
      <span class="Form-Item-Label-Required">必須</span>ユーザー名
    </p>
    <AtomInput
      @emitInput="emitName"
      placeholder="山田太郎"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AtomInput from "@/components/Atoms/AtomInput.vue";

export default defineComponent({
  name: "MolNameForm",
  components: {
    AtomInput,
  },
  setup(_, context) {
    const emitName = (inputName: string) => {
      context.emit("emitInput", inputName);
    };

    return {
      emitName,
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
.Form-Item-Label-Required {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 48px;
  display: inline-block;
  text-align: center;
  background: #42b983;
  color: #fff;
  font-size: 14px;
}
@media screen and (max-width: 480px) {
  .Form-Item-Label-Required {
    border-radius: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 32px;
    font-size: 10px;
  }
}
</style>
