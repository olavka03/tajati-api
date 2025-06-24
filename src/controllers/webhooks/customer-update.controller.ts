import { klicktippService } from '@services'
import { Customer } from '@types'
import { Request, Response } from 'express'

export async function customerUpdate(req: Request, res: Response) {
  const customer = req.body as Customer
  const upsertedCustomer = await klicktippService.syncCustomer(customer)
  res.json(upsertedCustomer)
}
