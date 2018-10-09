import * as axios from 'axios'

export default function (context, next) {
  // console.log('cookie:', context.res.cookies)//.req.cookies, context.req.cookies)
  // let token = context.req.cookies && context.req.cookies.token;
  // if (token) {
  //   axios.defaults.headers['x-auth-token'] = context.req.cookies.token;
  // }
  next()
}
