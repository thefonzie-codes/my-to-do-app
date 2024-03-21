import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppData() {

  let token = window.sessionStorage.getItem("token")
  let view = "login";

  if (token) {
    view = "home";
  } else {
    view = "login";
  }

  const [state, setState] = useState({
    list: [],
    user: token,
    view: view,
  });

  console.log("state", state);

  return { state, setState };
}