import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from "../../services/CommonTypes";
import { IMovie, MovieServices } from "../../services/MovieServices";
import { IRootState } from "../reducers/RootReducer";
import { IAction } from "./ActionTypes";
import { ThunkAction } from 'redux-thunk'
export type SaveMoviesAction = IAction<'movie_save', {
    movies: IMovie[],
    total: number
}>
/**
 * 
 * @param movies 保存电影列表
 * @param total 
 * @returns 
 */
function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: 'movie_save',
        payload: {
            // 负载、载荷
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<'movie_setLoading', boolean>
/**
 * 
 * @param isLoading 设置加载状态
 * @returns 
 */
function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: 'movie_setLoading',
        payload: isLoading
    }
}


export type SetConditionAction = IAction<'movie_setCondition', ISearchCondition>
/**
 * 
 * @param condition 设置参数
 * @returns 
 */
function setConditionAction(condition: ISearchCondition): SetConditionAction {
    return {
        type: 'movie_setCondition',
        payload: condition
    }
}

export type DeleteAction = IAction<'movie_delete', string>
/**
 * 
 * @param id 删除电影
 * @returns 
 */
function deleteAction(id: string): DeleteAction {
    return {
        type: 'movie_delete',
        payload: id
    }
}

// 所有的action
export type MovieActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction

// 根据条件从服务器获取电影的数据
function fetchMovies(condition: ISearchCondition)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1.设置加载状态
        dispatch(setLoadingAction(true))
        // 2.设置条件
        dispatch(setConditionAction(condition))
        // 3.获取服务器数据
        // 获取仓库中的搜索条件
        const c = getState().movie.condition
        // 发送异步
        const resp: IResponsePageData<IMovie> | IResponseError = await MovieServices.getMovies(c)
        // 设置仓库中的状态
        const list = resp.data?.list
        const total = resp.data?.total
        dispatch(saveMoviesAction(list as IMovie[], total as number))
        // 4.设置加载状态
        dispatch(setLoadingAction(false))
    }
}

function deleteMovie(id: string)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1.设置加载状态
        dispatch(setLoadingAction(true))
        // 2.删除对应电影
        // 删除远程数据
        const resp:IResponseData<true>|IResponseError = await MovieServices.delete(id)
        // 删除本地数据
        if (resp.data) {
            dispatch(deleteAction(id))
        }
        dispatch(setLoadingAction(false))
    }
}

const MovieAction = {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie
}

export default MovieAction