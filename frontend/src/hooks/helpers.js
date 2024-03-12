import axios from "axios";

const handleDelete = (id) => {
  axios.delete(`http://localhost:8000/list_items/${id}`).then((response) => {
    console.log(response);
  })
  .then(() => {
    axios.get(
      "http://localhost:8000/list_items.json").then((response) => {
      console.log(response);
      setState({ list: response.data });
    });
  });
}

export { deleteListItem };