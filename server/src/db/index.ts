import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";
Mongoose.connect("mongodb://127.0.0.1:27017/moviedb", {
}).then(() => {
    console.log('链接数据库成功');
})
export { MovieModel }