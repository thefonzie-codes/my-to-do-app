import { useState, useEffect } from "react";
import axios from "axios";

export default function useAppData() {
  const [state, setState] = useState({
    list: [],
  });

  useEffect(() => {
    axios.get(
      "http://localhost:8000/list_items.json").then((response) => {
      console.log(response);
      setState({ list: response.data });
    });
  }, []);

  return { state, setState };
}