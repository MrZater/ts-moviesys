// 描述电影列表的状态类型

import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieServices";
import { DeleteAction, MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";
import { IReducer } from "./ReducerTypes";

export type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[],
    /**
     * 查询条件
     */
    condition: IMovieCondition,
    /**
     * 总记录数
     */
    total: number,
    /**
     * 是否正在加载
     */
    isLoading: boolean
    totalPage: number
}

// 默认状态
const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ''
    },
    total: 0,
    isLoading: false,
    totalPage: 0
}

type MovieReducer<A> = IReducer<IMovieState, A>
/**
 * 
 * @param state 保存电影Reducer
 * @param action 
 * @returns 
 */
const saveMovie: MovieReducer<SaveMoviesAction> = function (state, action) {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / state.condition.limit)
    }
}
/**
 * 
 * @param state 设置条件reducer
 * @param action 
 * @returns 
 */
const setCondition: MovieReducer<SetConditionAction> = function (state, action) {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
    return newState
}
/**
 * 
 * @param state 删除电影reducer
 * @param action 
 * @returns 
 */
const deleteMovie: MovieReducer<DeleteAction> = function (state, action) {
    return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload),
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit)
    }
}

/**
 * 
 * @param state 设置加载状态reducer
 * @param action 
 * @returns 
 */
const setLoading: MovieReducer<SetLoadingAction> = function (state, action) {
    return {
        ...state,
        isLoading: action.payload
    }
}



export function MovieReduces(state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case 'movie_delete':
            return deleteMovie(state, action)
        case 'movie_save':
            return saveMovie(state, action)
        case 'movie_setLoading':
            return setLoading(state, action)
        case 'movie_setCondition':
            return setCondition(state, action)
        default:
            return state
    }
}