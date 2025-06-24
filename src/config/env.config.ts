import zod from 'zod'
import dotenv from 'dotenv'
import { DEVELOPMENT_ENV, PRODUCTION_ENV } from '@constants'

dotenv.config()

const envSchema = zod.object({
  WHITE_LIST_ORIGINS: zod.string(),
  UTM_CAMPAIGN_ATTR_KEY: zod.string(),
  PORT: zod.string(),
  SHOPIFY_WEBHOOK_SECRET: zod.string(),
  SHOPIFY_ACCESS_TOKEN: zod.string(),
  SHOPIFY_SECRET_KEY: zod.string(),
  SHOPIFY_API_KEY: zod.string(),
  SHOPIFY_ADMIN_API_URL: zod.string(),
  NODE_ENV: zod.union([zod.literal(DEVELOPMENT_ENV), zod.literal(PRODUCTION_ENV)]),
  KLICKTIPP_EMAIL: zod.string(),
  KLICKTIPP_PASSWORD: zod.string(),
  KLICKTIPP_LIST_ID: zod.string(),
})

export const env = envSchema.parse(process.env)
