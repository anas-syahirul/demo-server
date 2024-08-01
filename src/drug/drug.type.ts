export default interface DrugType {
  name: string
  description?: string
  category: string
  purchasePrice: number
  sellingPrice?: number
  quantity?: number
  unitName: string
  expiredDate: Date
  supplierName: string
}
