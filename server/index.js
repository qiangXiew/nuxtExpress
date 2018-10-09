import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { Nuxt, Builder } from 'nuxt'
import api from './api';
import log4js from 'log4js';
import logConfig from './config/log4j';
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
var numCPUs = require('os').cpus().length
var cluster = require('cluster')

app.set('port', port)

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

log4js.configure(logConfig);

// app.use(log4js.connectLogger(log4js.getLogger('请求'), { level: 'auto' }));
// Import API Routes
app.use('/api', api)
app.use((req, res, next) => {
  res.cookie('name', '11111111', { maxAge: 30000 })
  console.log(req.cookies, res.cookies)
  next()

  // 其他代码省略
  // const context = {
  //   url: req.url,
  //   cookies: req.cookies
  // }
  // const renderStream = renderer.renderToStream(context)
  // 其他代码省略
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
/** 集群 */
// if (cluster.isMaster) {
//   console.log(`主进程 ${process.pid} 正在运行`);
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('listening', (worker, address) => {
//     console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ':' + address.port);
//   });

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`工作进程 ${worker.process.pid} 已退出`);
//   });
// } else {
//   app.listen(port, host)
//   console.log(`工作进程 ${process.pid} 已启动`);
// }
app.listen(port, host)
