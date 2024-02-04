import { Response } from 'express'
import { ISearchResult } from '../entities/CommonTypes'
export class ResponseHelper {
    /**
     * 错误响应
     * 
     * @static
     * @param {(string | string[])} error 
     * @param {Response} res 
     * 
     * @memberOf ResponseHelper
     */
    public static sendError(error: string | string[], res: Response) {
        let err: string
        if (error instanceof Array) {
            err = error.join(',')
        } else {
            err = error
        }
        // 完成响应
        res.send({
            data: null,
            err
        })
    }
    /*
     * 响应数据
     * 
     * @static
     * @param {*} data 
     * @param {Response} res 
     * 
     * @memberOf ResponseHelper
    * */
    public static sendData(data: any, res: Response) {
        res.send({
            code: 200,
            data
        })
    }

    /*
     * 响应分页数据
     * 
     * @static
     * @template T 
     * @param {ISearchResult<T>} result 
     * @param {Response} res 
     * 
     * @memberOf ResponseHelper
    * */
    public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
        if (result.errors.length) {
            this.sendError(result.errors, res)
        } else {
            res.send({
                code: 200,
                data: {
                    list: result.data,
                    total: result.count
                }
            })
        }
    }
}