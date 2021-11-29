import { useStore } from "vuex";
import { key } from "@/store";
import axios from "axios";

// 認証状態を返却する
// IN PARAM:
// OUT PARAM: 'login' or 'no_login'
export const getLoginStatus = (): string => {
  const store = useStore(key); // $storeではなくuseStore()で取得する
  // トークンを取得
  const token: string = store.getters.getToken;
  let isJwtToken = "login";

  if (token == "") {
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
  const store = useStore(key);
  const token: string = store.getters.getToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const userInfo: Mypage = await axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/mypage/",
    headers: headers,
  });

  return userInfo;
};
