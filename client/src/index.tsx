/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-15 11:26:15
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-30 15:08:53
 * @FilePath: /client/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import MovieAction from "./redux/actions/MovieAction";
// import { MovieServices } from './services/MovieServices';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

store.dispatch(MovieAction.fetchMovies({page: 1, limit: 10, key: ''}))
.then(() => {
  // const list = store.getState().movie.data
  // const id = list[0]._id || ''
  // store.dispatch(MovieAction.deleteMovie(id))
})