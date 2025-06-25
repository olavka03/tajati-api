import { getCustomerMetafield, klicktippService } from '@services'
import { Customer } from '@types'
import { Request, Response } from 'express'

export async function customerCreateOrUpdate(req: Request, res: Response) {
  const customer = req.body as Customer

  const customerMetafield = await getCustomerMetafield(customer.admin_graphql_api_id, {
    namespace: 'klicktipp',
    key: 'utm_campaign',
  })
  console.log({ customerMetafield })
  console.log({ customer })

  const upsertedCustomer = await klicktippService.syncCustomer(customer, customerMetafield?.value)
  return res.json(upsertedCustomer)
}
