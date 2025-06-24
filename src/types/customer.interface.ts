import { CustomerAddress } from './customer-address.interface'

export interface Customer {
  id: number
  email: string
  created_at: string | null
  updated_at: string | null
  first_name: string
  last_name: string
  state: string
  note: string | null
  verified_email: boolean
  multipass_identifier: string | null
  tax_exempt: boolean
  phone: string | null
  currency: string
  admin_graphql_api_id: string
  default_address: CustomerAddress[]
}
