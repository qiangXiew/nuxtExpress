import { Router } from 'express';
import axios from '../../src/plugins/axios';

const router = Router()

// Mock Users
const users = [
  { name: '23mofang' },
  { name: '23cube' }
]

router.get('/users', function (req, res, next) {
  res.status(200).json(users);
})

router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

router.post('/login', async function (req, res, next) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo-session' }
    return res.json({ username: 'demo-session' })
  }
  res.sendStatus(404)
  // const { password, username } = req.body;

  // async function login() {
  //   const response = await axios.post(`/v2/login?username=${username}&password=${password}`)
  //   console.log("**********" + response + "*********")
  //   return response;
  // }

  // login().then((e) => {
  //   // 把 token 存储到 cookie 中
  //   const { token } = e.data;
  //   if (token) {
  //     res.cookie('token', token, {
  //       maxAge: 60000 * 60 * 24
  //     })
  //   }
  //   // 原封不动返回
  //   return res.json(e)
  // }).catch((error) => {
  //   console.log(error)
  //   return res.json(error)
  // })
})

export default router
