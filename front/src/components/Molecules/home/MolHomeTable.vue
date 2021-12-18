<template>
  <div class="p-8">
    <table class="table-fixed w-4/5 mx-auto text-center border-separate">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>日付</th>
          <th>ステータス</th>
          <th>メモ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(elem, index) in postDate" :key="elem.id">
          <td class="break-words pt-8 pb-8">{{ elem["title"] }}</td>
          <td class="break-words pt-8 pb-8">{{ elem["date"] }}</td>
          <td class="break-words pt-8 pb-8">{{ calcDate(elem["date"]) }}</td>
          <td class="break-words pt-8 pb-8">{{ elem["memo"] }}</td>
          <td class="btn-area">
            <AtomButton
              :text="btnState.text"
              :disabled="btnState.disabled"
              @click="transitionDetail(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <router-link :to="{ name: 'Add' }">
      <div class="m-3">
        <button
          class="
            fixed
            bottom-8
            right-8
            w-14
            h-14
            bg-vue-green
            text-lg text-white
            font-semibold
            rounded-full
            hover:bg-green-200
          "
        >
          ＋
        </button>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import AtomButton from "@/components/Atoms/AtomButton.vue";
import { isVerifyAccessToken } from "@/helper/helper";
import { callTokenRefresh, callGetPostDateApi } from "@/model/model";

export default defineComponent({
  name: "MolHomeTable",
  components: {
    AtomButton,
  },
  setup(props, context) {
    const btnState = reactive({
      text: "編集",
      disabled: false,
    });

    onMounted(() => {
      getApiResponce();
    });

    const store = useStore(key); // $storeではなくuseStore()で取得する

    // storeに格納されているDrfPostDateを取得
    const postDate = computed(() => store.getters.getDrfPostDate);

    // タイムスタンプををYYYY-MM-DDの書式で返す
    const formatDate = (date: Date): string => {
      const y: number = date.getFullYear();
      const m: string = ("00" + (date.getMonth() + 1)).slice(-2);
      const d: string = ("00" + date.getDate()).slice(-2);
      return `${y + "-" + m + "-" + d}`;
    };

    // 日付計算用関数
    const calcDate = (date: Date): string => {
      const setDate: Date = new Date(date);
      const nowDate: Date = new Date(formatDate(new Date()));
      let rtnWord = "";
      const diffDay: number = Math.floor(
        (nowDate.getTime() - setDate.getTime()) / 86400000
      );

      if (diffDay === 0) {
        rtnWord = "今日が記念日です！";
      } else if (0 > diffDay) {
        rtnWord = `設定日まであと${Math.abs(diffDay)}日です！`;
      } else {
        rtnWord = `設定日から${diffDay}日経過しました！`;
      }

      return `${rtnWord}`;
    };

    const getApiResponce = async () => {
      // アクセストークンの有効期限を確認する
      const isVerify: boolean = await isVerifyAccessToken(store);
      // 期限切れならトークンをリフレッシュ
      if (!isVerify) {
        console.log("getApiResponce");
        await callTokenRefresh(store);
      }

      // 投稿一覧を取得する
      await callGetPostDateApi(store);
    };

    const transitionDetail = (index: string): void => {
      context.emit("emitDetail", index);
    };

    return {
      btnState,
      store,
      postDate,
      calcDate,
      transitionDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  border-spacing: 20px;
}
tr {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
