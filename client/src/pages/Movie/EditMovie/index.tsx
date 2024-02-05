/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-30 19:29:55
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-04 19:22:35
 * @FilePath: /client/src/pages/Movie/EditMovie/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { RouteComponentProps } from "react-router";
import MovieForm from "../../../components/MovieForm";
import { IMovie, MovieServices } from "../../../services/MovieServices";
import { IResponseData, IResponseError } from "../../../services/CommonTypes";

interface IParams {
    id: string
}

interface IMovieFormState {
    movie: IMovie | undefined
}
class EditMovie extends React.Component<RouteComponentProps<IParams>, IMovieFormState> {
    state: IMovieFormState = {
        movie: undefined
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        const resp = await MovieServices.getMovieById(id)
        if (resp.data) {
            this.setState({ movie: resp.data })
        }
    }
    render(): React.ReactNode {
        const id = this.props.match.params.id
        return (<>
            <MovieForm movie={this.state.movie} onSubmit={async (movie) => {
                const resp: IResponseData<true> | IResponseError = await MovieServices.edit(id, movie)
                if (resp.err) {
                    return resp.err
                }
                return ''
            }} />
        </>)
    }
}
export default EditMovie