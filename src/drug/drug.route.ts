import { Router } from 'express'
import {
  addDrug,
  deleteDrugById,
  getAlmostExpiredDrugsHandler,
  getDrug,
  getDrugStatisticsHandler,
  getDrugWithPageFilter,
  getExpiredDrug,
  getOutOfStockDrug,
  updateDrugHandler
} from './drug.controller'
import { requireUser } from '../middlewares/authorization'

export const DrugRouter: Router = Router()

DrugRouter.post('/', requireUser, addDrug)
DrugRouter.get('/', requireUser, getDrugWithPageFilter)
DrugRouter.get('/all', requireUser, getDrug)
DrugRouter.get('/almost-expired', requireUser, getAlmostExpiredDrugsHandler)
DrugRouter.get('/expired', requireUser, getExpiredDrug)
DrugRouter.get('/out-of-stock', requireUser, getOutOfStockDrug)
DrugRouter.get('/drug-statistics', requireUser, getDrugStatisticsHandler)
DrugRouter.get('/:id', requireUser, getDrug)
DrugRouter.put('/:id', requireUser, updateDrugHandler)
DrugRouter.delete('/:id', requireUser, deleteDrugById)
