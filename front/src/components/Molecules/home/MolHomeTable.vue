<template>
  <div class="detail">
    <table style="table-layout: fixed; width: 80%">
      <!-- テーブルセル幅設定 -->
      <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
        <col style="width: 33%" />
        <col style="width: 33%" />
      </colgroup>

      <thead>
        <tr>
          <th>タイトル</th>
          <th>日付</th>
          <th>メモ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(elem, index) in postDate" :key="elem.id">
          <td class="column">{{ elem["title"] }}</td>
          <!-- <td>{{ elem["date"] }}</td> -->
          <td class="column">{{ calcDate(elem["date"]) }}</td>
          <td class="column">{{ elem["memo"] }}</td>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from "vue";
import axios from "axios";
//import { AxiosRequestConfig } from "axios";
import { useStore } from "vuex";
import { key } from "@/store";

import AtomButton from "@/components/Atoms/AtomButton.vue";

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

    // 日付計算用関数
    const calcDate = (date: Date): string => {
      const setDate = new Date(date);
      const nowDate: Date = new Date();
      let diffDays: number;
      let word: string;

      if (setDate > nowDate) {
        let diff = Math.abs(setDate.getTime() - nowDate.getTime());
        diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        word = `設定日まであと${diffDays}日です！`;
      } else {
        let diff = Math.abs(nowDate.getTime() - setDate.getTime());
        diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        word = `設定日から${diffDays}日経過しました！`;
      }

      return word;
    };

    const getApiResponce = async () => {
      // ログインユーザーのトークンを取得
      const token: string = store.getters.getToken;

      await axios
        .get("http://127.0.0.1:8000/api/post_date/", {
          headers: {
            Authorization: token,
          },
        }) // GET post_date一覧取得
        .then((response) => {
          store.commit("setDrfResponcePostDate", response.data);
        })
        .catch((error) => console.log(error));
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
  table-layout: fixed;
  width: 30%; /* テーブルのセル幅固定 */
  margin-left: auto;
  margin-right: auto;
  //border: 3px solid #42b983;
  text-align: center;
}

.column {
  word-wrap: break-word; // 改行させる設定
  padding: 50px 0px;
}
</style>
