// axiosConfig.js

import axios from "axios";
import setHeader from "./axiosHeadet";

axios.defaults.headers.common["Authorization"] = setHeader();
const instance = axios.create({
  baseURL: `http://localhost:3001/api`,
  // You can add other default configurations here
});

export default instance;

// export default axios;
