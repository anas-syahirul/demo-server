import { Router } from 'express'
import { addCategory, deleteCategoryById, editCategory, getCategory } from './category.controller'
import { requireUser } from '../middlewares/authorization'

export const CategoryRouter: Router = Router()

CategoryRouter.get('/', requireUser, getCategory)
CategoryRouter.post('/', requireUser, addCategory)
CategoryRouter.put('/:id', requireUser, editCategory)
CategoryRouter.delete('/:id', requireUser, deleteCategoryById)
