/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-02-05 12:04:44
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-05 14:42:21
 * @FilePath: /ts-moviesys/server/dist/routes/MovieRoute.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieServices_1 = require("../services/MovieServices");
const ResponseHelpers_1 = require("./ResponseHelpers");
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        const result = yield MovieServices_1.MovieService.findById(movieId);
        ResponseHelpers_1.ResponseHelper.sendData(result, res);
    }
    catch (error) {
        ResponseHelpers_1.ResponseHelper.sendData(null, res);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield MovieServices_1.MovieService.find(req.query);
        ResponseHelpers_1.ResponseHelper.sendPageData(result, res);
    }
    catch (error) {
        ResponseHelpers_1.ResponseHelper.sendData(null, res);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieServices_1.MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelpers_1.ResponseHelper.sendError(result, res);
    }
    else {
        ResponseHelpers_1.ResponseHelper.sendData(result, res);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield MovieServices_1.MovieService.edit(req.params.id, req.body);
        if (result.length) {
            ResponseHelpers_1.ResponseHelper.sendError(result, res);
        }
        else {
            ResponseHelpers_1.ResponseHelper.sendData(true, res);
        }
    }
    catch (error) {
        ResponseHelpers_1.ResponseHelper.sendError('id错误', res);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MovieServices_1.MovieService.delete(req.params.id);
        ResponseHelpers_1.ResponseHelper.sendData(true, res);
    }
    catch (error) {
        ResponseHelpers_1.ResponseHelper.sendError('id错误', res);
    }
}));
exports.default = router;
