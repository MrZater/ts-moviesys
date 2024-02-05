"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static sendError(error, res) {
        let err;
        if (error instanceof Array) {
            err = error.join(',');
        }
        else {
            err = error;
        }
        res.send({
            data: null,
            err
        });
    }
    static sendData(data, res) {
        res.send({
            code: 200,
            data
        });
    }
    static sendPageData(result, res) {
        if (result.errors.length) {
            this.sendError(result.errors, res);
        }
        else {
            res.send({
                code: 200,
                data: {
                    list: result.data,
                    total: result.count
                }
            });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
