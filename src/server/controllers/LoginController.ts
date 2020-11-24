import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import authConfig from '../../config/auth'

class LoginController {
  async login(req: Request, res: Response) {
    // const { username, password } = req.body

    const token = jwt.sign({ id: 1 }, authConfig.secretKey, {
      expiresIn: authConfig.expiresIn
    })

    console.log(token)

    return res.json({ token })
  }
}

export default new LoginController()
