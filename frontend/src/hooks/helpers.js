import axios from "axios";

const deleteListItem = (id) => {
  axios.delete(`http://localhost:8000/list_items/${id}`).then((response) => {
    console.log(response);
  });
}

export { deleteListItem };