import { useState, useEffect } from "react";
import axios from "axios";
import { GET_USER } from "./helpers";


export default function useAppData() {

  let token = window.sessionStorage.getItem("token")
  let view = "login";
  let user = null;
  let list = [];

  if (token) {
    view = "home";
  }

  
  const [state, setState] = useState({
    list: [],
    view: view,
    user: user,
  });
  

  return { state, setState };
}