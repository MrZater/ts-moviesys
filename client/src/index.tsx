/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-15 11:26:15
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-02 15:12:11
 * @FilePath: /client/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import zhCN from 'antd/locale/zh_CN';
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);


// 界面
// antd：UI库