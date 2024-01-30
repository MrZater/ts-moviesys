export interface ISearchResult<T>{
    data: T[];// 数据总数
    count: number;// 查询数据
    errors: string[];// 查询的错误
}