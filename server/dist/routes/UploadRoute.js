"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ResponseHelpers_1 = require("./ResponseHelpers");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../public/upload'),
    filename: (req, file, cb) => {
        const time = new Date().getTime();
        const extname = path_1.default.extname(file.originalname);
        cb(null, `${time}${extname}`);
    }
});
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const extname = path_1.default.extname(file.originalname);
        if (extname !== '.png' && extname !== '.jpg' && extname !== '.jpeg' && extname !== '.gif') {
            return cb(null, false);
        }
        cb(null, true);
    }
}).single('imgfile');
router.post("/", (req, res) => {
    try {
        upload(req, res, (err) => {
            var _a;
            if (err) {
                ResponseHelpers_1.ResponseHelper.sendError(err.message, res);
            }
            else {
                const url = `/upload/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
                ResponseHelpers_1.ResponseHelper.sendData(url, res);
            }
        });
    }
    catch (err) {
        ResponseHelpers_1.ResponseHelper.sendError(err, res);
    }
});
exports.default = router;
