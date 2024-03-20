import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppData() {

  let token = window.sessionStorage.getItem("token")
  let view = "login";

  if (token) {
    
    view = "home";

    useEffect(() => {
      axios.get(
        "http://localhost:8000/list_items.json", {
        headers: {
          'Authorization': `Token ${token}`,
        }
      }).then((response) => {
        setState({ ...state, list: response.data });
      });
    }, []);
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