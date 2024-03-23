import { useState, useEffect } from "react";
import axios from "axios";
import { GET_ITEMS_BY_USER, GET_USER } from "./helpers";


export default function useAppData() {

  let token = window.sessionStorage.getItem("token")
  let view = "login";
  let user = null;
  let list = [];


  const [state, setState] = useState({
    list: [],
    view: view,
    user: user,
  });

  useEffect(() => {
    GET_USER(state, setState);
    GET_ITEMS_BY_USER(state, setState);
  }, []);
  
  return { state, setState };
}