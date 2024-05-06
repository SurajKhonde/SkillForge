import axios from "axios";

const client = axios.create({
  baseURL: "https://skillforge-server-production.up.railway.app/api",
});

export default client;
