import { useState, useEffect, useReducer } from "react";
import { GET_ITEMS_BY_USER, AUTHENTICATE } from "./helpers";

const token = window.sessionStorage.getItem("token");
if (token) {
  const items = await GET_ITEMS_BY_USER();
  const user = await AUTHENTICATE();
}

export default function useAppData() {

  let view = "login";

  const [state, setState] = useState({
    list: [],
    view: view,
  });

  useEffect(() => {
    ;
    if (token) {
      setState({ ...state, view: "home", list: items, user: user });
    }
  }, []);

  return { state, setState };
}