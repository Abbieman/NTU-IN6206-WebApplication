import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://www.bus.topup.com/api";

export interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // from Cookie get token
    const token = Cookies.get("token") || "";
    if (token) {
      // add Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
