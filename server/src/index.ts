import 'reflect-metadata'
// import { MovieService } from './services/MovieServices'
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRoute'

import Express from 'express'
import path from 'path'
const app = Express()
// 使用绝对路径进行托管
app.use('/upload', Express.static(path.join(__dirname, 'public/upload')))
app.use(require('./corsMiddlewave'))
app.use(Express.json())// 配置请求消息体的JSON消息格式解析中间件
app.use('/api/movie', MovieRouter)
app.use('/api/upload', UploadRouter)
app.listen(3000)
