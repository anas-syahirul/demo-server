import { Router } from 'express'
import {
  calculateNetIncomeController,
  generateFinancialReportController,
  getCurrentMonthRecapController,
  getRevenueAndCOGS
} from './report.controller'
import { requireUser } from '../middlewares/authorization'

export const ReportRouter: Router = Router()

ReportRouter.get('/current-month', requireUser, getCurrentMonthRecapController)
ReportRouter.get('/revenue-and-cogs', requireUser, getRevenueAndCOGS)
ReportRouter.post('/net-income-calculation', requireUser, calculateNetIncomeController)
ReportRouter.post('/financial-report', requireUser, generateFinancialReportController)
