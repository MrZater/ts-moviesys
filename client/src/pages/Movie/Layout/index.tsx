/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 12:07:16
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-02 15:05:25
 * @FilePath: /client/src/pages/Movie/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Route, NavLink } from 'react-router-dom'
import Home from "../Home";
import MovieList from "../MovieList";
import AddMovie from "../AddMovie";
import EditMovie from "../EditMovie";
import { Layout, Menu, MenuProps } from 'antd'
import './index.css'
const { Header, Sider, Content } = Layout;
// menu每一项必传
type MenuItem = Required<MenuProps>['items'][number];
// 
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuProps['items'] = [
    getItem(<NavLink to='/'>首页</NavLink>, '1'),
    getItem(<NavLink to='/movie'>电影列表</NavLink>, '2'),
    getItem(<NavLink to='/movie/add'>电影添加</NavLink>, '3'),
]

const _Layout: React.FC = function () {
    return (<div className="layout-container">
        <Layout>
            <Header className="header">
                <NavLink to='/'>MovieSys</NavLink>
            </Header>
            <Layout className="content">
                <Sider theme="light">
                    <Menu items={items} defaultSelectedKeys={['1']} mode="inline" theme="light">
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