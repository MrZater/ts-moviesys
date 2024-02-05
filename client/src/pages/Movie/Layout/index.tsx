/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 12:07:16
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-05 12:44:33
 * @FilePath: /client/src/pages/Movie/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Route, NavLink, RouteComponentProps } from 'react-router-dom'
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

class _Layout extends React.Component<RouteComponentProps> {
    state: {current: string} = {
        current: '3'
    }
    componentWillReceiveProps() {
        const path = this.props.location.pathname
        if (path === '/'){
            console.log(123);
            this.setState({
                current: '1'
            })
        }else if(path === '/movie'){
            this.setState({
                current: '2'
            })
        } else if(path === '/movie/add'){
            this.setState({
                current: '3'
            })
        }
         
    }
    render() {
        return (<div className="layout-container">
            <Layout>
                <Header className="header">
                    <NavLink to='/'>MovieSys</NavLink>
                </Header>
                <Layout className="content">
                    <Sider theme="light">
                        <Menu items={items} defaultSelectedKeys={[this.state.current]} mode="inline" theme="light">
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
}


export default _Layout