import { Router } from 'express'
import {
  createSale,
  deleteSaleController,
  getAllSalesController,
  getLastInvoiceHandler,
  getRecentSalesController,
  getSaleByIdController,
  getSaleDetailPDF,
  getSalesDataController,
  getSalesProfitController,
  getTotalIncomeAndSalesController,
  updateSaleController
} from './sale.controller'
import { requireUser } from '../middlewares/authorization'

export const SaleRouter: Router = Router()

SaleRouter.post('/', requireUser, createSale)
SaleRouter.get('/last-invoice', requireUser, getLastInvoiceHandler)
SaleRouter.get('/sale-statistics', requireUser, getTotalIncomeAndSalesController)
SaleRouter.get('/sales-data', requireUser, getSalesDataController)
SaleRouter.get('/recent-sales', requireUser, getRecentSalesController)
SaleRouter.get('/all-sales', requireUser, getAllSalesController)
SaleRouter.get('/sales-profit', requireUser, getSalesProfitController)
SaleRouter.get('/detail-sale/:id', requireUser, getSaleDetailPDF)
SaleRouter.get('/:id', requireUser, getSaleByIdController)
SaleRouter.put('/:id', requireUser, updateSaleController)
SaleRouter.delete('/:id', requireUser, deleteSaleController)
