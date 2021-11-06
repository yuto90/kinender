import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

export interface State {
  inputDate: string;
  inputTitle: string;
  inputMemo: string;
  drfPostDate: string[];
  token: string;
}

export const key: InjectionKey<Store<State>> = Symbol(); // Stateのキーと型の一覧

// 初期データを変数に格納
const getDefaultState = () => {
  return {
    inputDate: "",
    inputTitle: "",
    inputMemo: "",
    drfPostDate: [],
    token: "",
  };
};

export const store = createStore<State>({
  plugins: [createPersistedState({ storage: window.sessionStorage })], // ブラウザのセッションにstoreに保存
  state: getDefaultState,
  mutations: {
    setDate(state, payload) {
      state.inputDate = payload;
    },
    setTitle(state, payload) {
      state.inputTitle = payload;
    },
    setMemo(state, payload) {
      state.inputMemo = payload;
    },
    setDrfResponcePostDate(state, payload) {
      state.drfPostDate = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    // vuex-persistedstateで永続化したstateデータを初期化(ログアウト)
    jwtReset(state) {
      // stateに初期データを上書きしてログアウト
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    getDrfPostDate(state): string[] {
      return state.drfPostDate;
    },
    getInputDate(state): string {
      return state.inputDate;
    },
    getInputTitle(state): string {
      return state.inputTitle;
    },
    getInputMemo(state): string {
      return state.inputMemo;
    },
    getToken(state): string {
      return state.token;
    },
  },
  actions: {
    // 入力内容リセット用
    resetInputValue(context) {
      context.commit("setDate", "");
      context.commit("setTitle", "");
      context.commit("setMemo", "");
    },
  },
});
