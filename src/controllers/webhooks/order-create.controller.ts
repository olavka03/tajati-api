import { Customer, NoteAttribute } from '@types'
import { Request, Response } from 'express'
import { env } from '@config'
import { updateCustomerMetafield } from '@services'

export async function orderCreate(req: Request, res: Response) {
  const orderAttributes = (req.body?.note_attributes ?? []) as NoteAttribute[]
  const customer = (req.body?.customer ?? null) as Customer | null
  const utmAttr = orderAttributes.find((attr) => attr.name === env.UTM_CAMPAIGN_ATTR_KEY) ?? null
  const customerId = customer?.admin_graphql_api_id ?? null

  if (!customerId || !utmAttr) {
    res.sendStatus(400)
  }

  const updatedCustomer = await updateCustomerMetafield(customerId, {
    namespace: 'klicktipp',
    key: 'utm_campaign',
    value: utmAttr?.value ?? '',
  })

  res.json(updatedCustomer)
}
