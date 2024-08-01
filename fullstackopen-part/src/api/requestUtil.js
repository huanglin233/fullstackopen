import axios from '../utils/request.js';

const baseUrl = "http://127.0.0.1:3002/";

const getAll = () => {
  const request = axios.get(baseUrl + "api/db/getAllNote");

  return request.then((response) => response.data);
};

const save = (data) => {
  const res = axios({
    method: "POST",
    url: baseUrl + "api/db/save",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.then((response) => response);
};

const login = (form) => {
  const res = axios({
    method: "POST",
    url: baseUrl + "api/auth/login",
    data: form,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.then((response) => response);
};

export default { getAll, save, login};
