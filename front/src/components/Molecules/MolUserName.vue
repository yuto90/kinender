<template>
  <AtomButton :text="userName" :btnColor="'#fff'" :btnTextColor="'#000'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import { callMypageApi } from "@/helper/helper.ts";

export default defineComponent({
  name: "MolUserName",
  components: {
    AtomButton,
  },
  async setup() {
    // MypageApiを叩いてnameを返す
    const getUserName = async () => {
      type Mypage = {
        data: {
          id: string;
          name: string;
          email: string;
          is_active: boolean;
          is_staff: boolean;
        };
      };

      const res: Mypage = await callMypageApi();
      return res["data"]["name"];
    };

    const userName: string = await getUserName();

    return {
      userName,
    };
  },
});
</script>
