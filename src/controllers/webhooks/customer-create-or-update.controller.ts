import { klicktippService } from '@services'
import { Customer } from '@types'
import { Request, Response } from 'express'

export async function customerCreateOrUpdate(req: Request, res: Response) {
  const customer = req.body as Customer
  console.log({ customer })
  const upsertedCustomer = await klicktippService.syncCustomer(customer)
  return res.json(upsertedCustomer)
}
