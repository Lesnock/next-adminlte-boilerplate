import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import authConfig from '../../config/auth'

interface TokenDecoded {
  id?: number
}

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(498).json({ error: 'Token was not provided' })
  }

  const [, token] = authorization.split(' ')

  try {
    const decoded = <TokenDecoded>jwt.verify(token, authConfig.secretKey)
    req.userId = decoded.id
  } catch (err) {
    return res.status(498).json({ error: 'Invalid token' })
  }

  return next()
}
