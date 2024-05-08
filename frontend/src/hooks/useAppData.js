import { useState, useEffect} from "react";
import { GET_ITEMS_BY_USER, AUTHENTICATE } from "./helpers";

let user = await AUTHENTICATE();
let items = await GET_ITEMS_BY_USER();

export default function useAppData() {
 
  const [state, setState] = useState({
    list: [],
    view: "login",
  });

  if (!!user) {
    state.view = "home";
    return { state, setState };
  }

  useEffect(() => {
    if (user) {
      setState({ ...state, view: "home", list: items, user: user });
    }
  }, []);

  return { state, setState };
}