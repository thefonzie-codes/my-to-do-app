import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppData() {
  const [state, setState] = useState({
    to_do_items: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8000/list_items.json").then((response) => {
      console.log(response);
      setState({ to_do_items: response.data });
    });
  }, []);

  return state;
}