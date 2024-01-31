/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 12:07:16
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-31 17:11:12
 * @FilePath: /client/src/pages/Movie/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Route, NavLink } from 'react-router-dom'
import Home from "../Home";
import MovieList from "../MovieList";
import AddMovie from "../AddMovie";
import EditMovie from "../EditMovie";
import { Layout, Menu } from 'antd'
import './index.css'
const { Header, Sider, Content } = Layout;

const _Layout: React.FC = function () {
    return (<div className="layout-container">
        <Layout>
            <Header className="header">
                <NavLink to='/'>MovieSys</NavLink>
            </Header>
            <Layout>
                <Sider theme="light">
                    <Menu defaultSelectedKeys={['1']} mode="inline" theme="light">
                        <Menu.Item key={'1'}>
                            <NavLink to='/'>首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'2'}>
                            <NavLink to='/movie'>电影列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'3'}>
                            <NavLink to='/movie/add'>电影添加</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <div className="main">
                        <Route path="/" component={Home} exact={true}></Route>
                        <Route path="/movie" component={MovieList} exact={true}></Route>
                        <Route path="/movie/add" component={AddMovie}></Route>
                        <Route path="/movie/edit/:id" component={EditMovie}></Route>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>)
}


export default _Layout