/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-02-04 16:30:21
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 19:06:56
 * @FilePath: /client/src/components/MovieForm/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Checkbox, Form, Input, InputNumber, Switch, message } from "antd";
import React from "react";
import { IMovie } from "../../services/MovieServices";
import ImgUploader from "../ImgUploader";
import { allAreas, allTypes } from "./options";
import { RouteComponentProps, withRouter } from "react-router";
interface IMovieFormProps extends RouteComponentProps{
    onSubmit: (movie : any) => Promise<string>,
    form?: IMovie 
}

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

const Groups = Checkbox.Group

class MovieForm extends React.Component<IMovieFormProps> {
    render(): React.ReactNode {
        return (
            <Form {...formItemLayout} onFinish={async (val) => {
                const result = await this.props.onSubmit(val)
                if (result) {
                    message.error(result)
                } else {
                    message.success("提交成功！", 1, () => {
                        // 跳转页面
                        this.props.history.push('/movie')
                    })
                }
            }}>
                {/* 电影名称 */}
                <Form.Item<IMovie>
                    label="电影名称"
                    rules={[{ required: true, message: '请输入电影名称' }]}
                    name={"name"}
                >
                    <Input placeholder="请输入电影名称" style={{ width: 400 }} />
                </Form.Item>
                {/* 时长 */}
                <Form.Item<IMovie>
                    label="时长"
                    rules={[{ required: true, message: '请输入时长' }]}
                    name={'timeLong'}
                >
                    <InputNumber style={{ width: 120 }} placeholder="请输入时长" min={1} step={10} />
                </Form.Item>
                {/* 电影封面 */}
                <Form.Item<IMovie>
                    label="电影封面"
                    name={'poster'}
                // 默认是value
                // valuePropName="value"
                >
                    <ImgUploader />
                </Form.Item>
                {/* 上映地区 */}
                <Form.Item<IMovie>
                    label="上映地区"
                    rules={[{ required: true, message: '请选择上映地区' }]}
                    name={'areas'}
                    initialValue={[]}
                >
                    <Groups options={allAreas} />
                </Form.Item>
                {/* 电影类型 */}
                <Form.Item<IMovie>
                    label="电影类型"
                    rules={[{ required: true, message: '请选择电影类型' }]}
                    name={'types'}
                    initialValue={[]}
                >
                    <Groups options={allTypes} />
                </Form.Item>
                {/* 正在热映 */}
                <Form.Item<IMovie>
                    label="正在热映"
                    name={'isHot'}
                    initialValue={false}
                >
                    <Switch size="small"></Switch>
                </Form.Item>
                {/* 即将上映 */}
                <Form.Item<IMovie>
                    label="即将上映"
                    name={'isComing'}
                    initialValue={false}
                >
                    <Switch size="small"></Switch>
                </Form.Item>
                {/* 经典影片 */}
                <Form.Item<IMovie>
                    label="经典影片"
                    name={'isClassic'}
                    initialValue={false}
                >
                    <Switch size="small"></Switch>
                </Form.Item>
                {/* 经典影片 */}
                <Form.Item<IMovie>
                    label="电影描述"
                    name={'description'}
                >
                    <Input.TextArea style={{ width: 500 }} placeholder="请输入电影描述"></Input.TextArea>
                </Form.Item>
                {/* 提交按钮 */}
                <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 20, offset: 6 }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button htmlType="reset" style={{ marginLeft: 5 }}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}


export default withRouter(MovieForm)
;