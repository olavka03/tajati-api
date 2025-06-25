import { shopifyClient } from '@api'
import { gql } from 'graphql-request'

export async function getCustomerEmail(id: string | null) {
  if (!id) {
    return
  }

  const getCustomerEmailQuery = gql`
    query GetCustomerMetafield($id: ID!) {
      customer(id: $id) {
        defaultEmailAddress {
          emailAddress
        }
      }
    }
  `

  const variables = {
    id,
  }

  const { customer } = (await shopifyClient.request(getCustomerEmailQuery, variables)) as {
    customer: {
      defaultEmailAddress: {
        emailAddress: string
      }
    }
  }

  return customer.defaultEmailAddress.emailAddress
}
