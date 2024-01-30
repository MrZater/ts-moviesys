import { IMovie } from '../db/MovieSchema';
import { MovieModel } from '../db';
import { Movie } from '../entities/Movie'
import { SearchCondition } from '../entities/SearchCondition';
import { ISearchResult } from '../entities/CommonTypes';

export class MovieService {
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 1. 类型转换
        movie = Movie.transform(movie);
        // 2. 数据验证
        const result = await movie.validateThis(false)
        if (result.length > 0) {
            return result
        }
        // 3. 添加到数据库
        return await MovieModel.create(movie)
    }
    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 1. 类型转换
        const movieObj = Movie.transform(movie);
        // 2. 数据验证
        const result = await movieObj.validateThis(true)
        if (result.length > 0) {
            return result
        }
        // 3. 修改数据库
        await MovieModel.updateOne({ _id: id }, movie)
        return result
    }
    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ _id: id })
    }
    public static async findById(id: string): Promise<IMovie | null> {
        const result = await MovieModel.findById(id)
        return result

    }
    public static async find(condition: SearchCondition): Promise<ISearchResult<Movie>> {
        // 1. 类型转换
        const searchCondtionObj = SearchCondition.transform(condition);
        // 2. 数据验证
        const errors = await searchCondtionObj.validateThis(true)
        if (errors.length > 0) {
            return {
                count: 0,
                data: [],
                errors
            }
        }
        const movieList = await MovieModel.find({
            name: { $regex: new RegExp(searchCondtionObj.key) }
        }).skip((searchCondtionObj.page - 1) * searchCondtionObj.limit).limit(searchCondtionObj.limit)
        const count = await MovieModel.find({
            name: { $regex: new RegExp(searchCondtionObj.key) }
        }).countDocuments()
        return {
            count,
            data: movieList,
            errors: []
        }
    }
}