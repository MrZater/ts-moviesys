/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-08-28 14:53:43
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-05 11:50:50
 * @FilePath: /server/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'reflect-metadata'
// import { MovieService } from './services/MovieServices'
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRoute'
import history from 'connect-history-api-fallback'

import Express from 'express'
import path from 'path'
const app = Express()
app.use(history())
// 使用绝对路径进行托管
app.use('/', Express.static(path.join(__dirname, 'public/build')))
app.use('/upload', Express.static(path.join(__dirname, 'public/upload')))
app.use(require('./corsMiddlewave'))
app.use(Express.json())// 配置请求消息体的JSON消息格式解析中间件
app.use('/api/movie', MovieRouter)
app.use('/api/upload', UploadRouter)
app.listen(3000)
