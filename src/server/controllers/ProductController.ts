import { Request, Response } from 'express'

class ProductController {
  async index(req: Request, res: Response) {
    return res.json({ status: 'certo6' })
  }
}

export default new ProductController()
