//--------------------------------------------------
//! APIを叩く関数
//--------------------------------------------------

import { Store } from "vuex";
import { State } from "@/store";
import axios, { AxiosResponse } from "axios";

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
      store.commit("setDrfResponsePostDate", response.data);
    })
    .catch((error) => console.log(error));
};

// 投稿を新規作成
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callPostPostDateApi = async (store: Store<State>, inputDate: string, inputTitle: string, inputMemo: string, author_id: string) => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const data = {
    date: inputDate, // DRFに送信する際にDate型に変換
    title: inputTitle,
    memo: inputMemo,
    author_id: author_id,
  };

  await axios({
    method: "post",
    url: `${baseUrl}/api/post_date/`,
    headers: headers,
    data: data,
  });
};

// 投稿を更新
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callPatchPostDateApi = async (store: Store<State>, id: number, inputDate: string, inputTitle: string, inputMemo: string) => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const data = {
    date: inputDate, // DRFに送信する際にDate型に変換
    title: inputTitle,
    memo: inputMemo,
  };

  await axios({
    method: "patch",
    url: `${baseUrl}/api/post_date/${id}/`,
    data: data,
    headers: headers,
  });
};

// 投稿を削除する
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callDeletePostDateApi = async (store: Store<State>, id: number) => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  await axios({
    method: "delete",
    url: `${baseUrl}/api/post_date/${id}/`,
    headers: headers,
  });
};

// ログイン中ユーザー情報の更新
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callAuthUpdateApi = async (store: Store<State>, data: { name: string } | { email: string } | { password: string }): Promise<AxiosResponse<any, any>> => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const response = await axios({
    method: "patch",
    url: `${baseUrl}/api/auth_update/`,
    headers: headers,
    data: data,
  });

  return response;
};

// 新規ユーザーを登録
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callRegisterApi = async (store: Store<State>, name: string, email: string, pass: string): Promise<AxiosResponse<any, any>> => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const data = {
    name: name,
    email: email,
    password: pass,
  };

  const response = await axios({
    method: "post",
    url: `${baseUrl}/api/register/`,
    headers: headers,
    data: data,
  });

  return response;
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

// ユーザーを削除
// IN PARAM: storeインスタンス
// OUT PARAM:
export const callDeleteApi = async (store: Store<State>): Promise<AxiosResponse<any, any>> => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const data = {};

  const response = await axios({
    method: "delete",
    url: `${baseUrl}/api/delete/`,
    headers: headers,
    data: data,
  });

  return response;
};

// ユーザー情報を検証してトークンを生成する
// IN PARAM: storeインスタンス, 投稿ID
// OUT PARAM:
export const callDjoserCreateApi = async (store: Store<State>, email: string, pass: string): Promise<AxiosResponse<any, any>> => {
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const data = {
    email: email,
    password: pass,
  };

  const response = await axios({
    method: "post",
    url: `${baseUrl}/api/auth/jwt/create/`,
    headers: headers,
    data: data,
  });

  return response;
};

// リフレッシュトークンを使用して新しいアクセストークンを取得して保存する
// IN PARAM:storeインスタンス
// OUT PARAM:
export const callDjoserRefresh = async (store: Store<State>): Promise<void> => {
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
    url: `${baseUrl}/api/auth/jwt/refresh/`,
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
