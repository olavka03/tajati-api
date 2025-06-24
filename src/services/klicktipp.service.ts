import { klicktippClient } from '@api'
import { env } from '@config'
import { Customer, KlicktippSubscriber } from '@types'
import { KLICKTIPP_UTM_CAMPAIGN_KEY } from 'src/constants/klicktipp-utm-campaign-key.constant'
import { match, P } from 'ts-pattern'

class KlicktippService {
  private authHeaders: Record<string, string> | null = null

  private async fetchAuthHeaders() {
    const { data, headers } = await klicktippClient.post<{
      sessid: string
      session_name: string
      account: { uid: string }
    }>(
      '/account/login.json',
      {
        username: env.KLICKTIPP_EMAIL,
        password: env.KLICKTIPP_PASSWORD,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const authCookie = (headers['set-cookie'] ?? []).find((cookie) => cookie.startsWith(data.session_name)) ?? null

    this.authHeaders = {
      Cookie: authCookie ?? '',
    }

    return {
      Cookie: authCookie,
    }
  }

  private async getAuthHeaders() {
    if (this.authHeaders) {
      return this.authHeaders
    }

    const authHeaders = await this.fetchAuthHeaders()
    return authHeaders
  }

  private async getSubscriberById(id: string) {
    const authHeaders = await this.getAuthHeaders()

    const { data } = await klicktippClient.get<KlicktippSubscriber>(`/subscriber/${id}.json`, {
      headers: {
        ...authHeaders,
      },
    })

    return data
  }

  private async getSubscriberByEmail(email: string) {
    const authHeaders = await this.getAuthHeaders()

    const { data: subscriberIds } = await klicktippClient.post<string[]>(
      '/subscriber/search.json',
      {
        email,
      },
      {
        headers: {
          ...authHeaders,
        },
      },
    )

    const id = subscriberIds?.[0] ?? null

    if (!id) {
      return null
    }

    const subscriber = await this.getSubscriberById(id)
    return subscriber
  }

  private async createSubscriber(body: Record<string, string | Record<string, string>>) {
    const authHeaders = await this.getAuthHeaders()

    const { data } = await klicktippClient.post<KlicktippSubscriber>(
      '/subscriber',
      {
        ...body,
        listid: env.KLICKTIPP_LIST_ID,
      },
      {
        headers: {
          ...authHeaders,
        },
      },
    )

    return data
  }

  private async updateSubscriber(subscriberId: string, body: Record<string, string | Record<string, string>>) {
    const authHeaders = await this.getAuthHeaders()

    const { data } = await klicktippClient.put<KlicktippSubscriber>(`/subscriber/${subscriberId}`, body, {
      headers: {
        ...authHeaders,
      },
    })

    return data
  }

  public async syncCustomer(customer?: Customer | null, utmCampaign?: string | null) {
    if (!customer) {
      return
    }

    const klicktippSubscriber = await this.getSubscriberByEmail(customer.email)
    const customerAddress = (customer.default_address ?? []).find((address) => address.default) ?? null

    const fields = {
      fieldFirstName: customer.first_name ?? '',
      fieldLastName: customer.last_name ?? '',
      fieldCompanyName: customerAddress?.company ?? '',
      fieldStreet1: customerAddress?.address1 ?? '',
      fieldStreet2: customerAddress?.address2 ?? '',
      fieldCity: customerAddress?.city ?? '',
      fieldState: customer.state ?? '',
      fieldZip: customerAddress?.zip ?? '',
      fieldCountry: customerAddress?.country_name ?? '',
      fieldPrivatePhone: customer.phone ?? '',
      fieldMobilePhone: customer.phone ?? '',
      fieldPhone: customer.phone ?? '',
      [KLICKTIPP_UTM_CAMPAIGN_KEY]: utmCampaign ?? '',
    } satisfies Record<string, string>

    const upsertedSubscriber = await match({ klicktippSubscriber })
      .with({ klicktippSubscriber: P.nonNullable.select() }, ({ id }) =>
        this.updateSubscriber.bind(this)(id, { newemail: customer.email, newsmsnumber: customer.phone ?? '', fields }),
      )
      .otherwise(() =>
        this.createSubscriber.bind(this)({ email: customer.email, smsnumber: customer.phone ?? '', fields }),
      )

    return upsertedSubscriber
  }
}

export const klicktippService = new KlicktippService()
