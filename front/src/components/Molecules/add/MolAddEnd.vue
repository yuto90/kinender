<template>
  <div class="mol-add-end">
    <h2>この内容で登録します。よろしいですか？</h2>

    <!-- todo style="table-layout:fixed;width:100%;" -->
    <table>
      <!-- テーブルセル幅設定 -->
      <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
      </colgroup>

      <tbody>
        <tr>
          <td>【日付】</td>
          <td v-if="storeGet.inputDate !== ''" align="left">
            {{ convertDateToJapanese() }}
          </td>
          <td v-else class="validate" align="left">※この項目は必須です。</td>
        </tr>

        <tr>
          <td>【タイトル】</td>
          <td v-if="storeGet.inputTitle !== ''" align="left">
            {{ storeGet.inputTitle }}
          </td>
          <td v-else class="validate" align="left">※この項目は必須です。</td>
        </tr>

        <tr>
          <td>【メモ】</td>
          <td align="left">
            {{ storeGet.inputMemo }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "MolAddEnd",
  setup() {
    const store = useStore(key);

    // ? storeのgettersで値を取得すると型がanyになってしまうのでアノテーションを明示
    const storeGet = reactive<{
      inputDate: string;
      inputTitle: string;
      inputMemo: string;
    }>({
      inputDate: store.getters.getInputDate,
      inputTitle: store.getters.getInputTitle,
      inputMemo: store.getters.getInputMemo,
    });

    // todo 日付フォーマット関数をhelper関数化する
    const convertDateToJapanese = (): string => {
      const splitDate: string[] = storeGet.inputDate.split("-");

      // 日付に何も入力されていなければ空文字を返す
      if (storeGet.inputDate === "") {
        return "";
      }

      return (
        `${Number(splitDate[0])}` +
        "年" +
        `${Number(splitDate[1])}` +
        "月" +
        `${Number(splitDate[2])}` +
        "日"
      );
    };

    return {
      storeGet,
      convertDateToJapanese,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

.validate {
  color: red;
}

table {
  table-layout: fixed;
  width: 30%; /* テーブルのセル幅固定 */
  margin-left: auto;
  margin-right: auto;
  //border: 3px solid #42b983;
}

table td {
  /*table内のtdに対して*/
  word-wrap: break-word; // 改行させる設定
  padding: 10px 0px;
}
</style>
