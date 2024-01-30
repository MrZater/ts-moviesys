import { Type } from "class-transformer"
import { IsInt, Min } from "class-validator"
import { BaseEntities } from "./BaseEntities"

export class SearchCondition extends BaseEntities<SearchCondition>{
    /*
     * 页码，从1开始
     * 
     * @type {number}
     * @memberOf SearchCondition
    * */
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '页码必须大于0' })
    @Type(() => Number)
    public page: number = 1
    /**
     * 页容量
     * 
     * @type {number}
     * @memberOf SearchCondition
     */
    @IsInt({ message: '页容量必须是整数' })
    @Min(1, { message: '页容量必须大于0' })
    @Type(() => Number)
    public limit: number = 10
    /*
     * 搜索关键字
     * 
     * @type {string}
     * @memberOf SearchCondition
    * */
    @Type(() => String)
    public key: string = ""
    
    /**
    *  将一个平面对象转化成SearchCondition对象
    * @param plainObject 平面对象
    * @returns 
    */
    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject)
    }
}