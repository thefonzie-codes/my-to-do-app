import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppData() {
  const [state, setState] = useState({
    list: [],
    view: 'login',
    user: null,
  });

  // useEffect(() => {
  //   axios.get(
  //     "http://localhost:8000/list_items.json").then((response) => {
  //     console.log(response);
  //     setState({ ...state, list: response.data });
  //   });
  // }, [state.user]);

  return { state, setState };
}