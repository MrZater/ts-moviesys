/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-10-27 19:25:04
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 16:07:09
 * @FilePath: /server/src/routes/UploadRoute.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Express from "express";
import multer from "multer";
import { ResponseHelper } from "./ResponseHelpers";
import path from "path";
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/upload'),
    filename: (req, file, cb) => {
        // 文件名
        const time = new Date().getTime()
        // 后缀名
        const extname = path.extname(file.originalname)
        cb(null, `${time}${extname}`)
    }
})

const router = Express.Router();
// const upload = multer({ dest: path.resolve(__dirname, "../public/upload") });
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        if (extname !== '.png' && extname !== '.jpg' && extname !== '.jpeg' && extname !== '.gif') {
            return cb(null, false);
        }
        cb(null, true);
    }
}).single('imgfile');
router.post("/", (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                // 发生错误
                ResponseHelper.sendError(err.message, res)
            } else {
                const url = `/upload/${req.file?.filename}`
                ResponseHelper.sendData(url, res)
            }

        })

    } catch (err) {
        ResponseHelper.sendError(err, res)
    }
})
export default router;