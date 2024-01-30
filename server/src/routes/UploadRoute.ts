import Express from "express";
const path = require("path");
import multer from "multer";
import { ResponseHelper } from "./ResponseHelpers";
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
        fileSize: 1024 * 1024 * 12
    },
    fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        // if (extname !== '.png' && extname !== '.jpg' && extname !== '.jpeg') {
        //     return cb(null, false);
        // }
        cb(null, true);
    }
}).single('imgfile');
router.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err.message, res)
        }
        const url = `/upload/${req.file?.filename}`
        ResponseHelper.sendData(url, res)
    })
})
export default router;