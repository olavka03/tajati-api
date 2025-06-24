import { create } from 'axios'

export const klicktippClient = create({
  baseURL: 'https://api.klicktipp.com',
  withCredentials: true,
})
