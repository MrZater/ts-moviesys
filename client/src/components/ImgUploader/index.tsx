/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-02-04 12:29:03
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 18:42:45
 * @FilePath: /client/src/components/ImgUploader/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, UploadFile, message } from "antd";
import React from "react";
import { baseUrl } from "../../services/MovieServices";
import { IResponseData, IResponseError } from "../../services/CommonTypes";

interface IImgUploaderProps {
    value?: string
    onChange?: (url: string) => void
}
interface IImgState {
    previewVisible: boolean,
}

class ImgUploader extends React.Component<IImgUploaderProps, IImgState> {
    state: IImgState = {
        previewVisible: false,
    }
    // 获取文件数组
    private getFileList(): UploadFile[] {
        if (this.props.value) {
            const curImgUrl = baseUrl + this.props.value
            return [
                {
                    uid: curImgUrl,
                    name: curImgUrl,
                    url: curImgUrl
                }
            ]
        }
        return []
    }
    // 获取上传按钮的样式
    protected getUploadContent() {
        if (!this.props.value) {
            return <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>点击上传</div>
            </button>
        } else {
            return
        }
    }
    // 文件状态改变回调
    private handleChange(info: any) {
    }
    // 自定义上传
    private async handleRequest(options: any) {
        const formData = new FormData()
        formData.append(options.filename, options.file)
        const request = new Request(options.action, {
            method: 'post',
            body: formData
        })
        const resp: IResponseData<string> | IResponseError = await fetch(request).then(res => res.json())
        if (resp.err) {
            // 上传失败
            message.error('上传失败！')
            // message.error(resp.err)
        } else {
            // 上传成功
            this.props.onChange && this.props.onChange(resp.data!)
        }
    }
    // 图片移除回调
    private handleRemove() {
        this.props.onChange && this.props.onChange('')
    }

    render(): React.ReactNode {
        return (
            <div>
                <Upload
                    action={`${baseUrl}/api/upload`}
                    customRequest={this.handleRequest.bind(this)}
                    name="imgfile"
                    accept=".jpg,.jpeg,.png,.gif"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleRemove.bind(this)}
                    onPreview={() => {
                        this.setState({
                            previewVisible: true
                        }
                        )
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal open={this.state.previewVisible} footer={null} onCancel={() => {
                    this.setState({
                        previewVisible: false
                    })
                }}>
                    <img src={baseUrl + this.props.value} alt="" style={{ width: '100%' }} />
                </Modal>
            </div>

        )
    }
}
export default ImgUploader;