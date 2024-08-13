import axios from "../utils/request.js";

const baseUrl = "http://127.0.0.1:3002/";

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = () => {
  const request = axios.get(baseUrl + "api/db/getAllNote");

  return request.then((response) => response);
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

/**
 * 用户登录后的新增
 */
const saveByUserId = (data) => {
  const res = axios({
    method: "POST",
    url: baseUrl + "api/note/add",
    data: data,
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });

  return res.then((response) => response);
};

/**
 * 获取当前登录人笔记列表
 */
const getNoteByUser = () => {
  const res = axios({
    method: "get",
    url: baseUrl + "api/user/note/list",
    headers: {
      authorization: token,
    },
  });

  return res.then((response) => response);
};

export default { getAll, save, login, saveByUserId, getNoteByUser, setToken };
