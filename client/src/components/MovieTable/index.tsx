/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-31 17:25:45
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-02 11:56:24
 * @FilePath: /client/src/components/MovieTable/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { IMovieState } from "../../redux/reducers/MovieReducers";
import { Switch, Table, TableColumnProps, Tag } from 'antd'
import { IMovie } from "../../services/MovieServices";
import DefaultPoster from '../../assets/images/defaultposter.png'
import { SwitchType } from "../../services/CommonTypes";
export interface IMovieTableEvents {
    onLoad: () => void
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void
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
                        return <img src={text} alt="" style={{
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
                    return <Switch defaultChecked={text} onChange={(checked: boolean) => {
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
                    return <Switch defaultChecked={text} onChange={(checked: boolean) => {
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
                    return <Switch defaultChecked={text} onChange={(checked: boolean) => {
                        if (this.props.onSwitchChange) {
                            this.props.onSwitchChange(SwitchType.isClassic, checked, record._id)
                        }
                    }} />
                }
            }
        ]
    }
    render(): React.ReactNode {
        const dataList = this.props.data
        return (
            <Table rowKey={(record) => record._id} dataSource={dataList} columns={this.getColumns()}></Table>
        )
    }
}
export default MovieTable