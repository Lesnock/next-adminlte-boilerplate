import Router from 'express'

// Middlewares
import AuthMiddleware from './middlewares/auth'

// Controllers
import LoginController from './controllers/LoginController'
import UserController from './controllers/UserController'

// Routers
export const Public = Router()
export const Private = Router()
Private.use(AuthMiddleware)

Public.post('/login', LoginController.login)

Private.get('/users/me', UserController.me)
