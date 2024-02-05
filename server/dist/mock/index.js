"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("../entities/Movie");
const MovieServices_1 = require("../services/MovieServices");
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
for (let i = 0; i <= 1000; i++) {
    const m = new Movie_1.Movie();
    m.name = `电影${i}`;
    m.areas = ['美国', '中国', '法国', '英国', '意大利', '韩国', '日本', '印度', '泰国', '俄罗斯', '伊朗', '加拿大'];
    m.types = ['剧情', '喜剧', '爱情', '动作', '科幻', '悬疑', '惊悚', '恐怖', '犯罪', '战争'];
    m.isClassic = true;
    m.isComing = true;
    m.isHot = true;
    m.timeLong = getRandom(10, 100);
    MovieServices_1.MovieService.add(m).then(res => {
        console.log('添加成功！', res);
    });
}
