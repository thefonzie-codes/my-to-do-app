import { useState, useEffect } from "react";
import axios from "axios";
import { GET_ITEMS_BY_USER} from "./helpers";


export default function useAppData() {

  let token = window.sessionStorage.getItem("token");
  let view = "login";
  let list = [];
  
  if (token) {
    view = "home";
  }

  const [state, setState] = useState({
    list: [],
    view: view,
  });

  useEffect(() => {
    GET_ITEMS_BY_USER(state, setState);
  }, [state.view]);

  return { state, setState };
}