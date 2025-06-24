import { GraphQLClient } from 'graphql-request'
import { env } from '@config'

export const shopifyClient = new GraphQLClient(env.SHOPIFY_ADMIN_API_URL, {
  headers: {
    'X-Shopify-Access-Token': env.SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
})
