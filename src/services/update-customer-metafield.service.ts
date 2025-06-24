import { shopifyClient } from '@api'
import { ApiError } from '@exceptions'
import { Metafield } from '@types'
import { gql } from 'graphql-request'

export async function updateCustomerMetafield(id: string | null, metafield: Metafield | null) {
  if (!metafield || !id) {
    return
  }

  const customerUpdateMutation = gql`
    mutation UpdateCustomerMetafield($input: CustomerInput!, $namespace: String!, $key: String!) {
      customerUpdate(input: $input) {
        customer {
          id
          defaultEmailAddress {
            emailAddress
          }
          metafield(namespace: $namespace, key: $key) {
            id
            key
            value
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `

  const variables = {
    input: {
      id,
      metafields: [metafield],
    },
    namespace: metafield.namespace,
    key: metafield.key,
  }

  const { customerUpdate } = (await shopifyClient.request(customerUpdateMutation, variables)) as {
    customerUpdate: {
      customer: {
        id: string
        defaultEmailAddress: {
          emailAddress: string
        }
        metafield: {
          id: string
          key: string
          value: string
        }
      }
      userErrors: Array<{ field: string; message: string }>
    }
  }

  const { customer, userErrors } = customerUpdate

  if (userErrors.length > 0) {
    throw new ApiError(userErrors[0].message, 400)
  }

  return customer
}
