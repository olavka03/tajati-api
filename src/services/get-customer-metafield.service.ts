import { shopifyClient } from '@api'
import { Metafield } from '@types'
import { gql } from 'graphql-request'

export async function getCustomerMetafield(id: string | null, metafield: Omit<Metafield, 'value'> | null) {
  if (!metafield || !id) {
    return
  }

  const getCustomerMetafieldQuery = gql`
    query GetCustomerMetafield($id: ID!, $namespace: String!, $key: String!) {
      customer(id: $id) {
        id
        metafield(namespace: $namespace, key: $key) {
          id
          key
          value
        }
      }
    }
  `

  const variables = {
    id,
    namespace: metafield.namespace,
    key: metafield.key,
  }

  const { customer } = (await shopifyClient.request(getCustomerMetafieldQuery, variables)) as {
    customer: {
      id: string
      metafield: {
        id: string
        key: string
        value: string
      }
    }
  }

  return customer.metafield
}
