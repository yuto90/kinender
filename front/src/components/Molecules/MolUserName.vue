<template>
  <div class="text-sm font-bold m-3.5">
    {{ userName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { callMypageApi } from "@/helper/helper.ts";

export default defineComponent({
  async setup() {
    // MypageApiを叩いてnameを返す
    const getUserName = async () => {
      type Mypage = {
        data: {
          id: number;
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
