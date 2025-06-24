import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'
import { env } from '@config'
import { ApiError } from '@exceptions'
import { DEVELOPMENT_ENV } from '@constants'

export async function validateShopifyWebhook(req: Request, _res: Response, next: NextFunction) {
  try {
    if (env.NODE_ENV === DEVELOPMENT_ENV) {
      next()
    }

    const body = req.rawBody
    const hmacHeader = req.get('x-shopify-hmac-sha256') || ''
    const generatedHmac = crypto.createHmac('sha256', env.SHOPIFY_WEBHOOK_SECRET).update(body, 'utf8').digest('base64')

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(hmacHeader, 'base64'),
      Buffer.from(generatedHmac, 'base64'),
    )

    if (!isValidSignature) {
      next('Shopify webhook signature mismatch.')
    }

    next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    next(new ApiError('Shopify webhook signature mismatch.', 400))
  }
}
