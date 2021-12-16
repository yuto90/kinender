import { Store, useStore } from "vuex";
import { key, State } from "@/store";
import axios from "axios";
import Axios from "axios";

// 認証状態を返却する
// IN PARAM:
// OUT PARAM: 'login' or 'no_login'
export const getLoginStatus = (): string => {
  const store = useStore(key); // $storeではなくuseStore()で取得する
  // トークンを取得
  const accessToken: string = store.getters.getAccessToken;
  let isJwtToken = "login";

  if (accessToken == "") {
    isJwtToken = "no_login";
  }
  return isJwtToken;
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

// DjoserVerifyApiを叩く
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

// アクセストークンの有効期限をチェックする
// IN PARAM:storeインスタンス
// OUT PARAM: boolean
export const isVerifyAccessToken = async (store: Store<State>): Promise<boolean> => {
  try {
    // DjoserVerifyApiを叩く
    await callDjoserVerifyApi(store);

    return true;
  } catch (e) {
    // トークンが有効期限切れの場合
    if (Axios.isAxiosError(e) && e.response && e.response.status === 401) {
      console.log("トークン期限切れ");
      console.log(e.message); //Axiosの例外オブジェクトとして扱える
    }
    return false;
  }
};
