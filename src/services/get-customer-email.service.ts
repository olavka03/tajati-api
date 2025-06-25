import { shopifyClient } from '@api'
import { gql } from 'graphql-request'

export async function getCustomerEmail(id: string | null) {
  if (!id) {
    return
  }

  const getCustomerEmailQuery = gql`
    query GetCustomerMetafield($id: ID!) {
      customer(id: $id) {
        id
        email
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
      id: string
      email: string
      defaultEmailAddress: {
        emailAddress: string
      }
    }
  }

  console.log({ deleteCustomer: customer })

  return customer.defaultEmailAddress.emailAddress
}
