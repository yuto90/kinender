import { Store, useStore } from "vuex";
import { key, State } from "@/store";
import axios from "axios";
import Axios from "axios";
import { callDjoserVerifyApi } from "@/model/model";

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
