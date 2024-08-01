import express, { Router } from 'express'
import multer from 'multer'
import { getStoreHandler, updateStoreHandler } from './store.controller'
import { requireUser } from '../middlewares/authorization'

const upload = multer()

export const StoreRouter: Router = express.Router()

StoreRouter.put('/', requireUser, upload.single('logo'), updateStoreHandler)
StoreRouter.get('/', requireUser, getStoreHandler)
