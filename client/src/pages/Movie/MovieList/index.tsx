/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2024-01-30 19:30:24
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-02-02 12:00:36
 * @FilePath: /client/src/pages/Movie/MovieList/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MovieTable, { IMovieTableEvents } from "../../../components/MovieTable";
import { connect } from 'react-redux'
import { IRootState } from "../../../redux/reducers/RootReducer";
import { Dispatch } from "react";
import MovieAction from "../../../redux/actions/MovieAction";
import { SwitchType } from "../../../services/CommonTypes";

// 获取state方法 mapStateToProps
function mapStateToProps(state: IRootState) {
    return state.movie
}
// 向组件注入事件监听方法
function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
    return {
        onLoad: () => {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ''
            }))
        },
        onSwitchChange: (type: SwitchType, newState: boolean, id: string) => {
            dispatch(MovieAction.changeSwitch(type, newState, id))
        }
    }
}
// 得到高阶组件方法
// 高阶组件
const MovieContainer: React.FC = connect(mapStateToProps, mapDispatchToProps)(MovieTable)

export default MovieContainer
