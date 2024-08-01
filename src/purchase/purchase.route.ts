import { Router } from 'express'
import { requireUser } from '../middlewares/authorization'
import {
  createPurchaseHandler,
  deletePurchaseHandler,
  getAllPurchasesHandler,
  getLastInvoiceHandler,
  getPurchaseByIdHandler,
  getPurchaseGraphDataHandler,
  getPurchaseOverviewHandler,
  getRecentPurchasesHandler,
  updatePurchaseHandler
} from './purchase.controller'

export const PurchaseRouter: Router = Router()

PurchaseRouter.post('/', requireUser, createPurchaseHandler)
PurchaseRouter.get('/', requireUser, getAllPurchasesHandler)
PurchaseRouter.get('/last-invoice', requireUser, getLastInvoiceHandler)
PurchaseRouter.get('/recent-purchase', requireUser, getRecentPurchasesHandler)
PurchaseRouter.get('/purchase-data', requireUser, getPurchaseGraphDataHandler)
PurchaseRouter.get('/overview', requireUser, getPurchaseOverviewHandler)
PurchaseRouter.get('/:id', requireUser, getPurchaseByIdHandler)
PurchaseRouter.put('/:id', requireUser, updatePurchaseHandler)
PurchaseRouter.delete('/:id', requireUser, deletePurchaseHandler)
