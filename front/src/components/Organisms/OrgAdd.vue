<template>
  <div class="text-center">
    <div class="p-7">
      <a
        class="font-bold text-gray-500 cursor-pointer"
        @click="clickFirst"
        :style="state.firstStyle"
        >Step1</a
      >
      ==>
      <a
        class="font-bold text-gray-500 cursor-pointer"
        @click="clickSecond"
        :style="state.secondStyle"
        >Step2</a
      >
      ==>
      <a
        class="font-bold text-gray-500 cursor-pointer"
        @click="clickThird"
        :style="state.thirdStyle"
        >Step3</a
      >
      ==>
      <a
        class="font-bold text-gray-500 cursor-pointer"
        @click="clickImage"
        :style="state.imageStyle"
        >Step4</a
      >
      ==>
      <a
        class="font-bold text-gray-500 cursor-pointer"
        @click="end"
        :style="state.endStyle"
        >End</a
      >
    </div>
    <keep-alive>
      <component :is="state.currentView" />
    </keep-alive>
    <AtomButton
      class="p-7"
      :text="state.buttonText"
      @click="changeStep"
      :disabled="state.disabled"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";

import MolAddFirst from "@/components/Molecules/add/MolAddFirst.vue";
import MolAddSecond from "@/components/Molecules/add/MolAddSecond.vue";
import MolAddThird from "@/components/Molecules/add/MolAddThird.vue";
import MolAddImage from "@/components/Molecules/add/MolAddImage.vue";
import MolAddEnd from "@/components/Molecules/add/MolAddEnd.vue";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import { isVerifyAccessToken } from "@/helper/helper";
import {
  callMypageApi,
  callPostPostDateApi,
  callDjoserRefresh,
} from "@/model/model";

export default defineComponent({
  name: "MolAdd",
  components: {
    MolAddFirst,
    MolAddSecond,
    MolAddThird,
    MolAddImage,
    MolAddEnd,
    AtomButton,
  },
  setup() {
    const store = useStore(key); // $storeではなくuseStore()で取得する
    const router = useRouter(); // $routeではなくuseRouter()で取得する

    const state = reactive({
      currentView: "MolAddFirst",
      firstStyle: "color: #42b983", // 緑
      secondStyle: "color: #2c3e50", // グレー
      thirdStyle: "color: #2c3e50",
      imageStyle: "color: #2c3e50",
      endStyle: "color: #2c3e50",
      buttonText: "次へ",
      disabled: false,
    });
    //const messageTwo = ref<string>("こんにちは");

    const clickFirst = () => {
      state.disabled = false;
      state.firstStyle = "color: #42b983";
      state.secondStyle = "color: #2c3e50";
      state.thirdStyle = "color: #2c3e50";
      state.imageStyle = "color: #2c3e50";
      state.endStyle = "color: #2c3e50";
      state.currentView = "MolAddFirst";
      state.buttonText = "次へ";
    };

    const clickSecond = () => {
      state.disabled = false;
      state.firstStyle = "color: #2c3e50";
      state.secondStyle = "color: #42b983";
      state.thirdStyle = "color: #2c3e50";
      state.imageStyle = "color: #2c3e50";
      state.endStyle = "color: #2c3e50";
      state.currentView = "MolAddSecond";
      state.buttonText = "次へ";
    };

    const clickThird = () => {
      state.disabled = false;
      state.firstStyle = "color: #2c3e50";
      state.secondStyle = "color: #2c3e50";
      state.thirdStyle = "color: #42b983";
      state.imageStyle = "color: #2c3e50";
      state.endStyle = "color: #2c3e50";
      state.currentView = "MolAddThird";
      state.buttonText = "次へ";
    };

    const clickImage = () => {
      state.disabled = false;
      state.firstStyle = "color: #2c3e50";
      state.secondStyle = "color: #2c3e50";
      state.thirdStyle = "color: #2c3e50";
      state.imageStyle = "color: #42b983";
      state.endStyle = "color: #2c3e50";
      state.currentView = "MolAddImage";
      state.buttonText = "次へ";
    };

    const end = () => {
      state.disabled = false;
      state.firstStyle = "color: #2c3e50";
      state.secondStyle = "color: #2c3e50";
      state.thirdStyle = "color: #2c3e50";
      state.imageStyle = "color: #2c3e50";
      state.endStyle = "color: #42b983";
      state.currentView = "MolAddEnd";
      state.buttonText = "登録";
    };

    const changeStep = async () => {
      // storeから入力情報を取得
      const inputDate: string = store.getters.getInputDate;
      const inputTitle: string = store.getters.getInputTitle;
      const inputMemo: string = store.getters.getInputMemo;

      if (state.currentView === "MolAddFirst") {
        state.disabled = false;
        state.firstStyle = "color: #2c3e50";
        state.secondStyle = "color: #42b983";
        state.currentView = "MolAddSecond";
      } else if (state.currentView === "MolAddSecond") {
        state.disabled = false;
        state.secondStyle = "color: #2c3e50";
        state.thirdStyle = "color: #42b983";
        state.currentView = "MolAddThird";
      } else if (state.currentView === "MolAddThird") {
        state.disabled = false;
        state.thirdStyle = "color: #2c3e50";
        state.imageStyle = "color: #42b983";
        state.currentView = "MolAddImage";
      } else if (state.currentView === "MolAddImage") {
        state.disabled = false;
        state.imageStyle = "color: #2c3e50";
        state.endStyle = "color: #42b983";
        state.currentView = "MolAddEnd";
        state.buttonText = "登録";

        // 未記入欄があれば登録ボタンを押せない様にする
        if (inputDate === "" || inputTitle === "" || inputMemo === "") {
          state.disabled = true;
        }
      } else if (state.currentView === "MolAddEnd") {
        // DRFと接続して登録処理
        type Mypage = {
          data: {
            id: string;
            name: string;
            email: string;
            is_active: boolean;
            is_staff: boolean;
          };
        };

        //        // アクセストークンの有効期限を確認する
        //        const isVerify: boolean = await isVerifyAccessToken(store);
        //        // 期限切れならトークンをリフレッシュ
        //        if (!isVerify) {
        //          await callDjoserRefresh(store);
        //        }
        //
        //        // todo vuexから持ってくる
        //        const userInfo: Mypage = await callMypageApi(store);
        //
        //        callPostPostDateApi(
        //          store,
        //          inputDate,
        //          inputTitle,
        //          inputMemo,
        //          userInfo["data"]["id"]
        //        );

        // 入力内容をリセット
        await store.dispatch("resetInputValue");

        // Homeにリダイレクト
        router.push("/");
      }
    };

    return {
      state,
      clickFirst,
      clickSecond,
      clickThird,
      clickImage,
      end,
      changeStep,
    };
  },
});
</script>
