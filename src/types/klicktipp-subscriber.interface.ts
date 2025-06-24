export interface KlicktippSubscriber {
  id: string
  listid: string
  optin: string
  optin_ip: string
  email: string
  status: string
  bounce: string
  date: string
  ip: string
  unsubscription: string
  unsubscription_ip: string
  referrer: string
  sms_phone: string | null
  sms_status: string | null
  sms_bounce: string | null
  sms_date: string
  sms_unsubscription: string
  sms_referrer: string | null
  fieldFirstName: string
  fieldLastName: string
  fieldCompanyName: string
  fieldStreet1: string
  fieldStreet2: string
  fieldCity: string
  fieldState: string
  fieldZip: string
  fieldCountry: string
  fieldPrivatePhone: string
  fieldMobilePhone: string
  fieldPhone: string
  fieldFax: string
  fieldWebsite: string
  fieldBirthday: string
  fieldLeadValue: string
}
