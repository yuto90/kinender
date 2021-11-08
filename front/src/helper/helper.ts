import { useStore } from "vuex";
import { key } from "@/store";

// 認証状態を返却する
// return: 'login' or 'no_login'
export const getLoginStatus = (): string => {
  const store = useStore(key); // $storeではなくuseStore()で取得する
  // トークンを取得
  const token: string = store.getters.getToken;
  let isJwtToken = "login";

  // トークンが格納されていなければ未ログイン画面を表示する
  if (token == "") {
    isJwtToken = "no_login";
  }
  return isJwtToken;
};
