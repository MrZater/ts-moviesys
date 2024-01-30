/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-29 18:08:10
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-30 14:21:00
 * @FilePath: /client/src/redux/reducers/RootReducer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { combineReducers } from "redux";
import { IMovieState, MovieReduces } from "./MovieReducers";
/**
 * 整个网站的根状态
 */
export interface IRootState {
    movie:IMovieState

}

export const rootReducer = combineReducers({
    movie: MovieReduces,
})