import 'dotenv/config'
import next from 'next'
import express from 'express'
import { Public, Private } from '../routes'
import { IncomingMessage, ServerResponse } from 'http'

/**
 * Create a next server with express
 */
export function createNextServer(port: number | string) {
  const dev = process.env.NODE_ENV !== 'production'

  const app = next({ dev })

  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createExpressServer(port, handle)
  })
}

/**
 * Create an express server
 * @param {app.getRequestHandler} nextAppHandle
 */
export function createExpressServer(
  port: number | string,
  nextAppHandle?: (req: IncomingMessage, res: ServerResponse) => Promise<void>
) {
  const server = express()

  // Only create express routes when it is in production
  if (!nextAppHandle) {
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())

    server.use(Public)
    server.use(Private)
  }

  // If nextAppHandle is not passed, just the api will be created
  if (nextAppHandle) {
    server.get('*', (req, res) => {
      return nextAppHandle(req, res)
    })
  }

  server.listen(port, () => {
    console.log('Running at port ' + port)
  })
}
