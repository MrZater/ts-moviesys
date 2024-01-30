import Express from 'express';
import { MovieService } from '../services/MovieServices';
import { ResponseHelper } from './ResponseHelpers';
const router = Express.Router()
/**
 * 通过ID查询
 */
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id
        console.log(movieId)
        const result = await MovieService.findById(movieId)
        ResponseHelper.sendData(result, res)
    } catch (error) {
        console.log(error);
        ResponseHelper.sendData(null, res)
    }
})
/**
 * 分页查询
 */
router.get('/', async (req, res) => {
    try {
        const result = await MovieService.find(req.query as any)
        ResponseHelper.sendPageData(result, res)
    } catch (error) {
        ResponseHelper.sendData(null, res)
    }
})

router.post('/', async (req, res) => {
    const result = await MovieService.add(req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})

router.put('/:id', async (req, res) => {
    try {
       const result = await MovieService.edit(req.params.id, req.body)
       if (result.length){
        ResponseHelper.sendError(result, res)
       } else {
        ResponseHelper.sendData(true, res)
       }

    } catch (error) {
        ResponseHelper.sendError('id错误', res)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await MovieService.delete(req.params.id)
        ResponseHelper.sendData(true, res)
    } catch (error) {
        ResponseHelper.sendError('id错误', res)
    }
})

export default router