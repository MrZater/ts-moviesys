/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-29 18:14:43
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-30 14:17:28
 * @FilePath: /client/src/redux/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Middleware, applyMiddleware, createStore } from "redux";
import logger from 'redux-logger'
import thunk, { ThunkMiddleware } from "redux-thunk";
import { IRootState, rootReducer } from "./reducers/RootReducer";
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger as Middleware)
);