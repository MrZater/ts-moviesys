"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const db_1 = require("../db");
const Movie_1 = require("../entities/Movie");
const SearchCondition_1 = require("../entities/SearchCondition");
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(movie);
            const result = yield movie.validateThis(false);
            if (result.length > 0) {
                return result;
            }
            return yield db_1.MovieModel.create(movie);
        });
    }
    static edit(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieObj = Movie_1.Movie.transform(movie);
            const result = yield movieObj.validateThis(true);
            if (result.length > 0) {
                return result;
            }
            yield db_1.MovieModel.updateOne({ _id: id }, movie);
            return result;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.MovieModel.deleteOne({ _id: id });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.MovieModel.findById(id);
            return result;
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchCondtionObj = SearchCondition_1.SearchCondition.transform(condition);
            const errors = yield searchCondtionObj.validateThis(true);
            if (errors.length > 0) {
                return {
                    count: 0,
                    data: [],
                    errors
                };
            }
            const movieList = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(searchCondtionObj.key) }
            }).skip((searchCondtionObj.page - 1) * searchCondtionObj.limit).limit(searchCondtionObj.limit);
            const count = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(searchCondtionObj.key) }
            }).countDocuments();
            return {
                count,
                data: movieList,
                errors: []
            };
        });
    }
}
exports.MovieService = MovieService;
