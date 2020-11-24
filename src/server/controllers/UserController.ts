import { Request, Response } from 'express'

class UserController {
  async me(req: Request, res: Response) {
    return res.json({ id: 1, name: 'Caio Lesnock' })
  }
}

export default new UserController()
