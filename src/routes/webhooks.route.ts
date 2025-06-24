import { Router } from 'express'
import { catchError } from '@utils'
import { orderCreate, customerUpdate } from '@controllers/webhooks'

export const webhooksRouter = Router()

webhooksRouter.post('/order/create', catchError(orderCreate))
webhooksRouter.post('/customer/update', catchError(customerUpdate))
