export interface CustomerAddress {
  id: number
  customer_id: number
  first_name: string
  last_name: string
  company: string | null
  address1: string | null
  address2: string | null
  city: string
  province: string
  country: string
  zip: string
  phone: string
  name: string
  province_code: string
  country_code: string
  country_name: string
  default: boolean
}
