import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}

export interface State {
  inputDate: string;
  inputTitle: string;
  inputMemo: string;
  drfPostDate: string[];
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
  baseUrl: string;
}

export const key: InjectionKey<Store<State>> = Symbol(); // Stateのキーと型の一覧

// 初期データを変数に格納
const getDefaultState = () => {
  return {
    inputDate: "",
    inputTitle: "",
    inputMemo: "",
    drfPostDate: [],
    accessToken: "",
    refreshToken: "",
    userInfo: {
      id: "",
      name: "",
      email: "",
      is_active: false,
      is_staff: false,
    },
    baseUrl: "http://127.0.0.1",
  };
};

export const store = createStore<State>({
  plugins: [createPersistedState({ storage: window.sessionStorage })], // ブラウザのセッションにstoreに保存
  state: getDefaultState,
  // 同期処理のみ
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
    setDrfResponsePostDate(state, payload) {
      state.drfPostDate = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setRefreshToken(state, payload) {
      state.refreshToken = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
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
    getAccessToken(state): string {
      return state.accessToken;
    },
    getRefreshToken(state): string {
      return state.refreshToken;
    },
    getUserInfo(state): UserInfo {
      return state.userInfo;
    },
  },
  // 非同期処理の可能
  actions: {
    // 入力内容リセット用
    resetInputValue(context) {
      context.commit("setDate", "");
      context.commit("setTitle", "");
      context.commit("setMemo", "");
    },
  },
});
