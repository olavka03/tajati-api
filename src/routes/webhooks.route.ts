import { Router } from 'express'
import { catchError } from '@utils'
import { orderCreate, customerCreateOrUpdate, customerDelete } from '@controllers/webhooks'

export const webhooksRouter = Router()

webhooksRouter.post('/order/create', catchError(orderCreate))
webhooksRouter.post('/customer/create', catchError(customerCreateOrUpdate))
webhooksRouter.post('/customer/update', catchError(customerCreateOrUpdate))
webhooksRouter.post('/customer/delete', catchError(customerDelete))
