/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-15 11:26:15
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-31 15:02:16
 * @FilePath: /client/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { MovieServices } from './services/MovieServices';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <App />
);
