import { createExpressServer } from './server'

const PORT = process.env.API_PORT || 3333

createExpressServer(PORT)
