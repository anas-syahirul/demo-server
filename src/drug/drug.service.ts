import { Prisma, PrismaClient } from '@prisma/client'
import DrugType from './drug.type'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

const prisma = new PrismaClient()
export default interface GetDrugsWithFiltersRequest {
  page: number
  limit: number
  name?: string
  categoryName?: string
  unitName?: string
}

export const getDrugByName = async (name: string) => {
  return prisma.drug.findUnique({
    where: { name }
  })
}

export const fetchCategoryId = async (categoryNames: string[]) => {
  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: categoryNames
      }
    },
    select: {
      id: true
    }
  })

  return categories.map((category) => category.id)
}

export const createDrug = async (drugData: DrugType) => {
  // Set default values if not provided
  const sellingPrice = drugData.sellingPrice ?? 0
  const quantity = drugData.quantity ?? 0
  const expiredDate = drugData.expiredDate ?? new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  return await prisma.drug.create({
    data: {
      name: drugData.name,
      description: drugData.description,
      category: drugData.category,
      purchasePrice: drugData.purchasePrice,
      sellingPrice: sellingPrice,
      quantity: quantity,
      unitName: drugData.unitName,
      expiredDate: expiredDate,
      supplierName: drugData.supplierName
    }
  })
}

export const fetchAllDrug = async () => {
  return await prisma.drug.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      purchasePrice: true,
      sellingPrice: true,
      quantity: true,
      unitName: true,
      expiredDate: true,
      supplierName: true
    }
  })
}

export const fetchDrugById = async (id: string) => {
  return await prisma.drug.findUnique({
    where: {
      id
    }
  })
}

export const fetchExpiredDrug = async () => {
  const today = new Date()
  return await prisma.drug.findMany({
    where: {
      expiredDate: {
        lt: today
      }
    }
  })
}

export const fetchOutOfStockDrug = async () => {
  return await prisma.drug.findMany({
    where: {
      quantity: {
        lte: 0
      }
    }
  })
}

export const getDrugsWithFilters = async (getDrugsWithFilters: GetDrugsWithFiltersRequest) => {
  const where: any = {}

  if (getDrugsWithFilters.name) {
    where.name = { contains: getDrugsWithFilters.name, mode: Prisma.QueryMode.insensitive }
  }

  if (getDrugsWithFilters.categoryName) {
    where.category = getDrugsWithFilters.categoryName
  }

  if (getDrugsWithFilters.unitName) {
    where.unitName = getDrugsWithFilters.unitName
  }

  const drugs = await prisma.drug.findMany({
    where,
    skip: (getDrugsWithFilters.page - 1) * getDrugsWithFilters.limit,
    take: getDrugsWithFilters.limit
  })

  const totalDrugs = await prisma.drug.count({ where })

  return {
    data: drugs,
    total: totalDrugs,
    page: getDrugsWithFilters.page,
    limit: getDrugsWithFilters.limit
  }
}

export const deleteDrug = async (id: string) => {
  return prisma.drug.delete({
    where: {
      id
    }
  })
}

export const fetchAlmostExpiredDrugs = async (limit: number = 5) => {
  return await prisma.drug.findMany({
    orderBy: {
      expiredDate: 'asc'
    },
    take: limit,
    select: {
      id: true,
      name: true,
      quantity: true,
      expiredDate: true
    }
  })
}

export const updateDrug = async (id: string, data: Partial<DrugType>) => {
  return await prisma.drug.update({
    where: { id },
    data
  })
}

const timeZone = 'Asia/Jakarta'

export const getDrugStatistics = async () => {
  const now = new Date()
  const currentDate = toZonedTime(now, timeZone)

  const totalDrugs = await prisma.drug.count()

  const totalQuantity = await prisma.drug.aggregate({
    _sum: {
      quantity: true
    }
  })

  const expiredDrugs = await prisma.drug.count({
    where: {
      expiredDate: {
        lte: currentDate
      }
    }
  })

  const outOfStockDrugs = await prisma.drug.count({
    where: {
      quantity: 0
    }
  })

  return {
    totalDrugs,
    totalQuantity: totalQuantity._sum.quantity || 0,
    expiredDrugs,
    outOfStockDrugs
  }
}
