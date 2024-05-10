// import React, { useContext } from "react";
import { GET_ITEMS_BY_USER, AUTHENTICATE } from "./helpers";

// const userData = React.createContext();
// const itemData = React.createContext();

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

// export async function useAppData() {
//   const user = await AUTHENTICATE();
//   const items = await GET_ITEMS_BY_USER();
//   console.log(user, items)
//   return { user, items };
// }