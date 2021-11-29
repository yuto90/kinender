<template>
  <div id="mol-home-detail">
    <table>
      <!-- テーブルセル幅設定 -->
      <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
      </colgroup>

      <tr>
        <th>日付</th>
        <td class="column">
          <AtomInputDate
            :defaultDate="state.postDetail['date']"
            @emitInputDate="emitInputDate"
          />
        </td>
      </tr>
      <tr>
        <th>タイトル</th>
        <td class="column">
          <AtomInput
            :placeholder="'タイトル名を入力してください'"
            :defaultTitle="state.postDetail['title']"
            @emitInput="emitInput"
          />
        </td>
      </tr>
      <tr>
        <th>メモ</th>
        <td class="column">
          <AtomTextarea
            :placeholder="'メモ等あればを入力してください'"
            :defaultText="state.postDetail['memo']"
            @emitTextarea="emitTextarea"
          />
        </td>
      </tr>
      <tr>
        <th>作成日時</th>
        <td class="column">
          {{ formatDateToString(state.postDetail["created_datetime"]) }}
        </td>
      </tr>
      <tr>
        <th>更新日時</th>
        <td class="column">
          {{ formatDateToString(state.postDetail["updated_datetime"]) }}
        </td>
      </tr>
    </table>

    <div class="btn">
      <AtomButton
        :text="'戻る'"
        @click="transitionTable"
        style="padding: 0px 3%"
      />
      <AtomButton
        :text="'更新'"
        @click="updateDetail"
        btnColor="#00CCFF"
        style="padding: 0px 3%"
      />
      <AtomButton
        :text="'削除'"
        @click="deletePost"
        btnColor="#FF4F50"
        style="padding: 0px 3%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import axios from "axios";

import AtomButton from "@/components/Atoms/AtomButton.vue";
import AtomInput from "@/components/Atoms/AtomInput.vue";
import AtomInputDate from "@/components/Atoms/AtomInputDate.vue";
import AtomTextarea from "@/components/Atoms/AtomTextarea.vue";

// propsのアノテーション
type Props = {
  index: number;
};

export default defineComponent({
  name: "MolHomeDetail",
  components: {
    AtomButton,
    AtomInput,
    AtomInputDate,
    AtomTextarea,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props, context) {
    // storeに接続
    const store = useStore(key);

    const state = reactive({
      // todo DRFからの個別取得にする
      postDetail: store.getters.getDrfPostDate[props.index],
    });

    const transitionTable = () => {
      context.emit("emitTable");
    };

    // DateオブジェクトをYYYYMMDD hh:mmに変換
    const formatDateToString = (strDate: string): string => {
      // Dateオブジェクトをインスタンス化
      const date = new Date(strDate);

      const yearStr = date.getFullYear();
      //月だけ+1すること
      const monthStr = 1 + date.getMonth();
      const dayStr = date.getDate();
      const hourStr = date.getHours();
      const minuteStr = date.getMinutes();

      let formatDate = "YYYY-MM-DD hh:mm";
      formatDate = formatDate.replace(/YYYY/g, `${yearStr}`);
      formatDate = formatDate.replace(/MM/g, `${monthStr}`);
      formatDate = formatDate.replace(/DD/g, `${dayStr}`);
      formatDate = formatDate.replace(/hh/g, `${hourStr}`);
      formatDate = formatDate.replace(/mm/g, `${minuteStr}`);

      return formatDate;
    };

    // 入力されている日付をstoreに登録
    const emitInputDate = (emitDate: string) => {
      store.commit("setDate", emitDate);
    };

    // 入力されているタイトルをstoreに登録
    const emitInput = (emitTitle: string): void => {
      store.commit("setTitle", emitTitle);
    };

    // 入力されているメモをstoreに登録
    const emitTextarea = (emitText: string) => {
      store.commit("setMemo", emitText);
    };

    // 投稿の削除
    const deletePost = async () => {
      const id: number = state.postDetail["id"];
      const token: string = store.getters.getToken;

      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      if (confirm("投稿を削除してよろしいですか？")) {
        await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/post_date/${id}/`,
          headers: headers,
        });

        // 入力内容をリセット
        await store.dispatch("resetInputValue");

        // Home(Table)へリダイレクト
        transitionTable();
      }
    };
    // 投稿のアップデート
    const updateDetail = async () => {
      // storeから入力情報を取得
      const inputDate: string = store.getters.getInputDate;
      const inputTitle: string = store.getters.getInputTitle;
      const inputMemo: string = store.getters.getInputMemo;

      const id: number = state.postDetail["id"];
      const token: string = store.getters.getToken;

      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const data = {
        date: inputDate, // DRFに送信する際にDate型に変換
        title: inputTitle,
        memo: inputMemo,
      };

      await axios({
        method: "patch",
        url: `http://127.0.0.1:8000/api/post_date/${id}/`,
        data: data,
        headers: headers,
      })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));

      // 入力内容をリセット
      await store.dispatch("resetInputValue");

      // Home(Table)へリダイレクト
      transitionTable();
    };

    return {
      store,
      state,
      transitionTable,
      formatDateToString,
      emitInputDate,
      emitInput,
      emitTextarea,
      updateDetail,
      deletePost,
    };
  },
});
</script>

<style lang="scss" scoped>
#mol-home-detail {
  text-align: center;
}

.btn {
  display: flex;
  justify-content: center;
  padding-top: 5%;
}

table {
  table-layout: fixed;
  width: 40%; /* テーブルのセル幅固定 */
  margin-left: auto;
  margin-right: auto;
  //border: 3px solid #42b983;
}
tr {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.column {
  word-wrap: break-word; // 改行させる設定
  padding: 40px 0px;
}
</style>
