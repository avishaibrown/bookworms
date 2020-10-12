import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookworms-6e226.firebaseio.com/",
});

export default instance;
