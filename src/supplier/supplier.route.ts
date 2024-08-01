import { Router } from 'express'
import { requireUser } from '../middlewares/authorization'
import { addSupplier, deleteSupplierById, editSupplier, getSuppliers } from './supplier.controller'

export const SupplierRouter: Router = Router()

SupplierRouter.get('/', requireUser, getSuppliers)
SupplierRouter.get('/:id', requireUser, getSuppliers)
SupplierRouter.post('/', requireUser, addSupplier)
SupplierRouter.put('/:id', requireUser, editSupplier)
SupplierRouter.delete('/:id', requireUser, deleteSupplierById)
