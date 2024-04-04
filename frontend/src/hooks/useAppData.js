import { useState, useEffect, useReducer } from "react";
import { GET_ITEMS_BY_USER, AUTHENTICATE} from "./helpers";

const items = await GET_ITEMS_BY_USER();
const user = await AUTHENTICATE();

export default function useAppData() {

  const token = window.sessionStorage.getItem("token");
  let view = "login";
  
  if (token) {
    view = "home";
  }

  const [state,setState] = useState({
    list: [],
    view: view,
  });

  useEffect(() => {;
    if (token){
    setState({ ...state, view: "home", list: items, user: user});
    }
  }, []);

  console.log(state);

  return { state, setState };
}