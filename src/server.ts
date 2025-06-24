import express from 'express'
import * as middlewares from '@middlewares'
import { env } from '@config'
import { webhooksRouter } from '@routes'

const app = express()
const PORT = env.PORT || 3000

app.use(middlewares.cors, middlewares.json)

app.get('/health', (_, res) => {
  res.json({ status: 'success', message: 'Tajati API' })
})

app.use('/webhooks', middlewares.validateShopifyWebhook, webhooksRouter)

app.use(middlewares.errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
