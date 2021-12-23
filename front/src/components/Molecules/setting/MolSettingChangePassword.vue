<template>
  <div class="Form-Item">
    <p class="Form-Item-Label">パスワード</p>
    <AtomPass @emitInput="emitPass" placeholder="pass" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomPass from "@/components/Atoms/AtomPass.vue";

export default defineComponent({
  name: "MolPassForm",
  components: {
    AtomPass,
  },
  setup(_, context) {
    const emitPass = (inputPass: string) => {
      context.emit("emitPass", inputPass);
    };

    return {
      emitPass,
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
