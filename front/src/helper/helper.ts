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

// ログイン中のユーザー名を返却する
// IN PARAM:
// OUT PARAM: string ログイン中のユーザー名
export const getLoginUserName = async (): Promise<string> => {
  type Mypage = {
    data: {
      id: number;
      name: string;
      email: string;
      is_active: boolean;
      is_staff: boolean;
    };
  };

  const store = useStore(key);
  const token: string = store.getters.getToken;

  if (token != "") {
    const userInfo: Mypage = await axios.get("http://127.0.0.1:8000/api/mypage/", {
      headers: {
        Authorization: token,
      },
    });
    console.log(userInfo["data"]["name"]);
    return userInfo["data"]["name"];
  } else {
    return "no_login";
  }
};
