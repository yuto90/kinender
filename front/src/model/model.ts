//--------------------------------------------------
//! APIを叩く関数
//--------------------------------------------------

import { Store } from "vuex";
import { State } from "@/store";
import axios from "axios";

// 投稿一覧を取得する
// IN PARAM: storeインスタンス
// OUT PARAM:
export const callGetPostDateApi = async (store: Store<State>) => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  await axios({
    method: "get",
    url: `${baseUrl}/api/post_date/`,
    headers: headers,
  })
    .then((response) => {
      store.commit("setDrfResponcePostDate", response.data);
    })
    .catch((error) => console.log(error));
};

// ログイン中のユーザー情報返却する
// IN PARAM:
// OUT PARAM:Mypage ログイン中のユーザー情報
type Mypage = {
  data: {
    id: string;
    name: string;
    email: string;
    is_active: boolean;
    is_staff: boolean;
  };
};
export const callMypageApi = async (store: Store<State>): Promise<Mypage> => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const userInfo: Mypage = await axios({
    method: "get",
    url: `${baseUrl}/api/mypage/`,
    headers: headers,
  });

  return userInfo;
};

// リフレッシュトークンを使用して新しいアクセストークンを取得して保存する
// IN PARAM:storeインスタンス
// OUT PARAM:
export const callTokenRefresh = async (store: Store<State>): Promise<void> => {
  const baseUrl: string = store.state.baseUrl;
  let refreshToken: string = store.getters.getRefreshToken;
  refreshToken = refreshToken.substring(4);

  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    refresh: refreshToken,
  };

  const newToken = await axios({
    method: "post",
    url: `${baseUrl}/token/refresh/`,
    headers: headers,
    data: data,
  });

  // 認証に成功したらaccessトークンとrefreshトークンをVuexに保存
  store.commit("setAccessToken", "JWT " + newToken.data["access"]);
  store.commit("setRefreshToken", "JWT " + newToken.data["refresh"]);
};

// アクセストークンを検証する
// IN PARAM:storeインスタンス
// OUT PARAM:
export const callDjoserVerifyApi = async (store: Store<State>) => {
  const baseUrl: string = store.state.baseUrl;
  let accessToken: string = store.getters.getAccessToken;
  accessToken = accessToken.substring(4);

  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    token: accessToken,
  };

  await axios({
    method: "post",
    url: `${baseUrl}/api/auth/jwt/verify/`,
    headers: headers,
    data: data,
  });
};
