/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-30 19:25:06
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 16:01:36
 * @FilePath: /client/src/pages/Home/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ImgUploader from "../../../components/ImgUploader";
import { baseUrl } from "../../../services/MovieServices";
class Home extends React.Component {
    state = {
        url: ''
    }
    render(): React.ReactNode {
        return (<ImgUploader value={this.state.url} onChange={(url) => {
            this.setState({
                url: url && `${baseUrl}${url}`
            })
        }} />)
    }
}
export default Home