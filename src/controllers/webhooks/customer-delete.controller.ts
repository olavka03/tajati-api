import { getCustomerEmail, klicktippService } from '@services'
import { Request, Response } from 'express'

export async function customerDelete(req: Request, res: Response) {
  const { admin_graphql_api_id } = req.body as { admin_graphql_api_id: string }
  const customerEmail = await getCustomerEmail(admin_graphql_api_id)

  if (customerEmail) {
    await klicktippService.removeSubscriber(customerEmail)
  }

  return res.sendStatus(200)
}
