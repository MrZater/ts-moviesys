/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-16 19:26:12
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 14:13:06
 * @FilePath: /client/src/services/MovieServices.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from "./CommonTypes";

export interface IMovie {
    _id: string;
    // 电影名
    name: string;
    // 电影类型
    types: string[];
    // 上映地区
    areas: string[];
    // 时长
    timeLong: number;
    // 是否热映
    isHot: boolean;
    // 是否即将上映
    isComing: boolean;
    // 是否为经典影片
    isClassic: boolean;
    // 电影描述
    description?: string;
    // 封面
    poster?: string;
}
export const baseUrl = 'http://127.0.0.1:3000'

export class MovieServices {
    // 添加电影请求方法
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data = {} } = await axios.post(`${baseUrl}/api/movie`, movie)
        return data;
    }

    // 修改电影请求方法
    public static async edit(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const { data = {} } = await axios.put(`${baseUrl}/api/movie/` + id, movie)
        return data
    }

    // 删除电影请求方法
    public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
        const { data = {} } = await axios.delete(`${baseUrl}/api/movie/` + id)
        return data
    }

    // 通过id查询电影请求方法
    public static async getMovieById(id: string): Promise<IMovie | null> {
        const { data = {} } = await axios.get(`${baseUrl}/api/movie/` + id)
        return data
    }

    // 获取电影数组请求方法
    public static async getMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie> | IResponseError> {
        const { data = {} } = await axios.get(`${baseUrl}/api/movie`, {
            params: condition
        })
        return data
    }
}