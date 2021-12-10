import { Store, useStore } from "vuex";
import { key, State } from "@/store";
import axios from "axios";

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
export const callMypageApi = async (): Promise<Mypage> => {
  const store: Store<State> = useStore(key);
  const baseUrl: string = store.state.baseUrl;
  const accessToken: string = store.getters.getAccessToken;

  try {
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
  } catch (e) {
    // apiを叩いてトークン期限切れでエラーになったらリフレッシュして再度叩く
    console.log("トークンをリフレッシュ");
    await callTokenRefresh(store);

    const headers = {
      "Content-Type": "application/json",
      Authorization: store.getters.getAccessToken,
    };

    const userInfo: Mypage = await axios({
      method: "get",
      url: `${baseUrl}/api/mypage/`,
      headers: headers,
    });

    return userInfo;
  }
};

// リフレッシュトークンを使用して新しいアクセストークンを取得して保存する
export const callTokenRefresh = async (store: Store<State>) => {
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
