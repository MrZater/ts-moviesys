import { validate } from "class-validator"
import { ClassConstructor, plainToClass } from 'class-transformer'

export abstract class BaseEntities<T> {
    /*
 * 
 * 验证当前电影对象
 * @param {boolean} [skipMissingProperties=false] 是否跳过未传入参数的验证
 * @returns {Promise<string[]>} 
 * 
 * @memberOf Movie
* */
    public async validateThis(skipMissingProperties: boolean = false): Promise<string[]> {
        const errors = await validate(this, { skipMissingProperties })
        const temp = errors.map(err => Object.values(err.constraints as object))
        const result = []
        temp.forEach((e) => {
            result.push(...e as [])
        })
        return result
    }
    /**
 *  将一个平面对象转化成movie对象
 * @param plainObject 平面对象
 * @returns movie对象
 */
    protected static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
        if (plainObject instanceof cls) return plainObject
        return plainToClass(cls, plainObject)
    }

}