<template>
  <AtomButton :text="userName" :btnColor="'#fff'" :btnTextColor="'#000'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Store, useStore } from "vuex";
import { key, State } from "@/store";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import { callMypageApi, callTokenRefresh } from "@/helper/helper";

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
      const store: Store<State> = useStore(key);

      try {
        const res: Mypage = await callMypageApi(store);
        return res["data"]["name"];
      } catch (e) {
        await callTokenRefresh(store);
        const res: Mypage = await callMypageApi(store);
        return res["data"]["name"];
      }
    };

    const userName: string = await getUserName();

    return {
      userName,
    };
  },
});
</script>
