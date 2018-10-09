import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works

// console.log(process.env.HOST)
if (process.server) {
  // console.log(process.server)
  options = {
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  }
}
const headers = {
  'Accept': 'application/json;charset=utf-8',
  'Content-Type': 'application/json;charset=utf-8'
};

axios.defaults.headers = headers;
axios.defaults.withCredentials = true;
const Axios = axios.create(options)

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // console.log('请求前传入了config', config)
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  // if (response.data.msg === "您还没有登录") {
  //   console.log(document.location.href)
  // }

  const data = response.data;
  return Promise.resolve(data);
}, function (error) {
  return Promise.reject(error.response.data);
});

export default Axios;
