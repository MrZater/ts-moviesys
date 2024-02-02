/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-18 16:46:37
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-02 11:59:19
 * @FilePath: /client/src/services/CommonTypes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 普通响应消息接口
export interface IResponseData<T> {
    data: T,
    err: null
}

// 数据列表响应消息接口
export interface IResponsePageData<T> {
    data: {
        list: T[],
        total: number
    },
    err: null
}

// 错误响应接口
export interface IResponseError {
    err: string,
    data: null
}

// 搜索条件接口
export interface ISearchCondition {
    page?: number
    limit?: number
    key?: string
}


// switch开关属性枚举
export enum SwitchType {
    isHot = 'isHot',
    isComing = 'isComing',
    isClassic = 'isClassic'
}