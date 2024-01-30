import { IsNotEmpty, MaxLength, MinLength, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from "class-validator"
import { Type, plainToClass } from 'class-transformer'
// class-transformer会使用该库设置元数据
import 'reflect-metadata'
import { BaseEntities } from "./BaseEntities";

// 电影类
export class Movie extends BaseEntities<Movie>{
    // 电影名
    @IsNotEmpty({ message: '电影名称不可以为空' })
    @MaxLength(10, { message: '电影名称长度不可以超过10' })
    @MinLength(2, { message: '电影名称长度不可以少于2' })
    @Type(() => String)
    public name: string;

    // 电影类型
    @IsNotEmpty({ message: '电影类型不可以为空' })
    @ArrayMinSize(1, { message: '电影类型长度至少有一个' })
    @Type(() => String)
    @IsArray({ message: '电影类型必须是数组' })
    public types: string[];

    // 上映地区
    @IsNotEmpty({ message: '上映地区不可以为空' })
    @ArrayMinSize(1, { message: '上映地区至少有一个' })
    @Type(() => String)
    @IsArray({ message: '上映地区必须是数组' })
    public areas: string[];

    // 时长
    @IsNotEmpty({ message: '时长不可以为空' })
    @IsInt({ message: '时长必须是整数' })
    @Min(1, { message: '时长必须大于1分钟' })
    @Max(2000, { message: '时长必须小于2000分钟' })
    @Type(() => Number)
    public timeLong: number;

    // 是否热映
    @IsNotEmpty({ message: '是否热映不可以为空' })
    @Type(() => Boolean)
    public isHot: boolean = false;

    // 是否即将上映
    @IsNotEmpty({ message: '是否即将上映不可以为空' })
    @Type(() => Boolean)
    public isComing: boolean = false;

    // 是否为经典影片
    @IsNotEmpty({ message: '是否是经典影片不可以为空' })
    @Type(() => Boolean)
    public isClassic: boolean = false;

    // 电影描述
    @Type(() => String)
    public description?: string;

    // 封面
    @Type(() => String)
    public poster?: string;

    /**
     *  将一个平面对象转化成movie对象
     * @param plainObject 平面对象
     * @returns movie对象
     */
    public static transform(plainObject: object): Movie {
        return super.baseTransform(Movie, plainObject)
    }
}


/*
 errors: [
    {
        constraints: {
            IsNotEmpty: '电影名不能为空'
        }
    },
    {
        constraints: {
            IsNotEmpty: '时长不能为空'
        }
    }
 ]
 */