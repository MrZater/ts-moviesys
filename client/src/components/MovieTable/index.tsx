/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 17:25:45
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-05 14:41:58
 * @FilePath: /client/src/components/MovieTable/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { IMovieState } from "../../redux/reducers/MovieReducers";
import { Switch, Table, TableColumnProps, Tag, Button, message, Popconfirm, TablePaginationConfig, Input } from 'antd'
import { IMovie, baseUrl } from "../../services/MovieServices";
import DefaultPoster from '../../assets/images/defaultposter.png'
import { SwitchType } from "../../services/CommonTypes";
import { NavLink } from "react-router-dom";
import { IRootState } from "../../redux/reducers/RootReducer";
import { SearchOutlined } from '@ant-design/icons';
export interface IMovieTableEvents {
    // 数据加载事件
    onLoad: () => void
    // 开关事件
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void
    // 删除事件
    onDelete: (id: string) => Promise<void>
    // 页码页容量修改事件
    onChange: (newPage: number, newLimit: number, props?: IRootState['movie']) => void
    // 关键字改变事件
    onKeyChange: (key: string) => void
    // 搜索事件
    onSearch: () => void
}

class MovieTable extends React.Component<IMovieState & IMovieTableEvents> {

    componentDidMount(): void {
        // 获取数据
        this.props.onLoad()
    }

    /*
     * 获取column
     * 
     * @private
     * @returns {TableColumnProps<IMovie>[]} 
     * 
     * @memberOf MovieTable
    * */
    private getColumns(): TableColumnProps<IMovie>[] {
        return [
            {
                title: '封面',
                dataIndex: 'poster',
                render: (text) => {
                    if (text) {
                        return <img src={`${baseUrl}${text}`} alt="" style={{
                            width: '100px'
                        }} />
                    } else {
                        return <img src={DefaultPoster} alt="" style={{
                            width: '100px'
                        }} />
                    }
                }
            },
            {
                title: '电影名称',
                dataIndex: 'name',
                filterDropdown: this.getFilterDropDown.bind(this),
                filterIcon: (<SearchOutlined />)
            },
            {
                title: '时长',
                dataIndex: 'timeLong',
                render: (text) => {
                    return text + '分钟'
                },
                width: 100
            },
            {
                title: '上映地区',
                dataIndex: 'areas',
                render: (text: IMovie['areas']) => {
                    return text.map((item, index) => <Tag key={index} color="blue" style={{ margin: '5px 3px' }}>{item}</Tag>)
                },
                width: 200
            },
            {
                title: '类型',
                dataIndex: 'types',
                render: (text: IMovie['types']) => {
                    return text.map((item, index) => <Tag key={index} color="yellow" style={{ margin: '5px 3px' }}>{item}</Tag>)
                },
                width: 200
            },
            {
                title: '即将上映',
                dataIndex: 'isComing',
                render: (text: IMovie['isComing'], record) => {
                    return <Switch size="small" defaultChecked={text} onChange={(checked: boolean) => {
                        if (this.props.onSwitchChange) {
                            this.props.onSwitchChange(SwitchType.isComing, checked, record._id)
                        }
                    }} />
                }
            },
            {
                title: '正在热映',
                dataIndex: 'isHot',
                render: (text: IMovie['isHot'], record) => {
                    return <Switch size="small" defaultChecked={text} onChange={(checked: boolean) => {
                        if (this.props.onSwitchChange) {
                            this.props.onSwitchChange(SwitchType.isHot, checked, record._id)
                        }
                    }} />
                }
            },
            {
                title: '经典影片',
                dataIndex: 'isClassic',
                render: (text: IMovie['isClassic'], record) => {
                    return <Switch size="small" defaultChecked={text} onChange={(checked: boolean) => {
                        if (this.props.onSwitchChange) {
                            this.props.onSwitchChange(SwitchType.isClassic, checked, record._id)
                        }
                    }} />
                }
            },
            {
                title: '操作',
                dataIndex: '_id',
                render: (text: IMovie['_id'], record) => {
                    return (
                        <div>
                            <NavLink to={'/movie/edit/' + text}>
                                <Button size="small" type="link">编辑</Button>
                            </NavLink>
                            <Popconfirm
                                title="确定删除该电影嘛？"
                                onConfirm={async () => {
                                    await this.props.onDelete(text)
                                    message.success('删除成功！')
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button size="small" type="link" style={{ color: 'red' }}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }
    // 分页器配置
    getPageConfig(): false | TablePaginationConfig {
        if (this.props.data.length === 0) {
            return false
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total,
        }
    }
    // 分页器事件
    handleChange(pagination: TablePaginationConfig) {
        this.props.onChange(pagination.current!, pagination.pageSize!, this.props)
    }
    // 重置按钮事件
    private async handleReset () {
        // 重置字段
        this.props.onKeyChange('')
        // 重新搜索
        this.props.onSearch()
    }
    // 获取名称过滤下拉方法
    getFilterDropDown(props: object) {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder="请输入电影名称"
                    value={this.props.condition.key}
                    onChange={(e) => { this.props.onKeyChange(e.target.value) }}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    onPressEnter={() => { this.props.onSearch() }}
                ></Input>
                <Button
                    type="primary"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={() => { this.props.onSearch() }}
                >搜索</Button>
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => { this.handleReset() }}
                >重置</Button>
            </div>
        )
    }
    render(): React.ReactNode {
        const dataList = this.props.data
        return (
            <Table loading={this.props.isLoading} pagination={this.getPageConfig()} onChange={this.handleChange.bind(this)} rowKey={(record) => record._id} dataSource={dataList} columns={this.getColumns()}></Table>
        )
    }
}
export default MovieTable