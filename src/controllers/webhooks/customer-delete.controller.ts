import { getCustomerEmail, klicktippService } from '@services'
import { Request, Response } from 'express'

export async function customerDelete(req: Request, res: Response) {
  const customerDeleteData = req.body as { admin_graphql_api_id: string }
  console.log({ customerDeleteData })
  const customerEmail = await getCustomerEmail(customerDeleteData.admin_graphql_api_id)

  if (customerEmail) {
    await klicktippService.removeSubscriber(customerEmail)
  }

  return res.sendStatus(200)
}
