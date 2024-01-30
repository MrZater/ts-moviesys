
export interface IResponseData<T> {
    data: T,
    err: null
}

export interface IResponsePageData<T> {
    data: {
        list: T[],
        total: number
    },
    err: null
}

export interface IResponseError {
    err: string,
    data: null
}


export interface ISearchCondition {
    page?: number
    limit?: number
    key?: string
}