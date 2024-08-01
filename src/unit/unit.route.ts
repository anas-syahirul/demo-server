import { Router } from 'express'
import { requireUser } from '../middlewares/authorization'
import { addUnit, deleteUnitById, editUnit, getUnits, searchUnit } from './unit.controller'

export const UnitRouter: Router = Router()

UnitRouter.get('/', requireUser, searchUnit)
UnitRouter.get('/all', requireUser, getUnits)
UnitRouter.post('/', requireUser, addUnit)
UnitRouter.put('/:id', requireUser, editUnit)
UnitRouter.delete('/:id', requireUser, deleteUnitById)
