import { Request, Response } from 'express'
import {
  getCurrentMonthRecap,
  getMonthlyRevenueAndCOGS,
  getNetIncomeEstimation,
  getYearlyRevenueAndCOGS
} from './report.service'

export const getCurrentMonthRecapController = async (req: Request, res: Response) => {
  try {
    const financials = await getCurrentMonthRecap()
    return res.status(200).json({ status: true, statusCode: 200, data: financials })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return res.status(500).json({ status: false, statusCode: 500, message: error.message })
    }
    console.error(error)
    return res.status(500).json({ status: false, statusCode: 500, message: 'An unexpected error occurred' })
  }
}
export const getRevenueAndCOGS = async (req: Request, res: Response) => {
  try {
    const monthlyData = await getMonthlyRevenueAndCOGS()
    const yearlyData = await getYearlyRevenueAndCOGS()

    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: {
        monthly: monthlyData,
        yearly: yearlyData
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: error.message })
    } else {
      console.error(error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'An unknown error occurred' })
    }
  }
}

export const calculateNetIncomeController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, operationCost, taxPercentage } = req.body

    if (!startDate || !endDate || operationCost === undefined || taxPercentage === undefined) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: 'Missing required fields: startDate, endDate, operationCost, taxPercentage'
      })
    }

    const data = await getNetIncomeEstimation({ startDate, endDate, operationCost, taxPercentage })

    res.status(200).json({ status: true, statusCode: 200, data: data.result })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: error.message })
    } else {
      console.error(error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'An unknown error occurred' })
    }
  }
}

export const generateFinancialReportController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, operationCost, taxPercentage } = req.body

    if (!startDate || !endDate || operationCost === undefined || taxPercentage === undefined) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: 'Missing required fields: startDate, endDate, operationCost, taxPercentage'
      })
    }

    const data = await getNetIncomeEstimation({ startDate, endDate, operationCost, taxPercentage })

    // Send PDF as attachment
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=net-income-estimation.pdf')
    return res.status(200).send(data.pdfDoc)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: error.message })
    } else {
      console.error(error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'An unknown error occurred' })
    }
  }
}
