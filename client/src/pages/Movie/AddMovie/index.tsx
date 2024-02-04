/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-30 19:29:10
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 18:50:28
 * @FilePath: /client/src/pages/AddMovie/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import MovieForm from "../../../components/MovieForm";
import { IMovie, MovieServices } from "../../../services/MovieServices";
import { IResponseData, IResponseError } from "../../../services/CommonTypes";
class AddMovie extends React.Component {
    render(): React.ReactNode {
        return (<>
            <MovieForm onSubmit={async (val) => {
                const res: IResponseData<IMovie> | IResponseError = await MovieServices.add(val)
                if (res.err) {
                    return res.err
                }
                return ''
            }} />
        </>)
    }
}
export default AddMovie