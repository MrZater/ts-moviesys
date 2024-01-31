/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 12:07:16
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-31 15:12:39
 * @FilePath: /client/src/pages/Movie/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { NavLink, Route } from 'react-router-dom'
import Home from "../Home";
import MovieList from "../MovieList";
import AddMovie from "../AddMovie";
import EditMovie from "../EditMovie";

const Layout: React.FC = function () {
    return (<div>
        <header>
            <ul>
                <li><NavLink to='/'>首页</NavLink></li>
                <li><NavLink to='/movie'>电影列表</NavLink></li>
                <li><NavLink to='/movie/add'>添加电影</NavLink></li>
                <li><NavLink to='/movie/edit/test'>修改电影</NavLink></li>
            </ul>
            <div>
                <Route path="/" component={Home} exact={true}></Route>
                <Route path="/movie" component={MovieList} exact={true}></Route>
                <Route path="/movie/add" component={AddMovie}></Route>
                <Route path="/movie/edit/:id" component={EditMovie}></Route>
            </div>
        </header>
    </div>)
}


export default Layout