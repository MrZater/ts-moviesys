/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-30 19:29:55
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-31 15:12:29
 * @FilePath: /client/src/pages/Movie/EditMovie/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
    id: string
}

class EditMovie extends React.Component<RouteComponentProps<IParams>> {
    render(): React.ReactNode {
        const id = this.props.match.params.id
        return (<h1>
            修改电影{id}
        </h1>)
    }
}
export default EditMovie