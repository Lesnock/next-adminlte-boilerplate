import Router from 'express'

// Controllers
import ProductController from './controllers/ProductController'

// Routers
export const Public = Router()
export const Private = Router()

Public.get('/test', ProductController.index)
