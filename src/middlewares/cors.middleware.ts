import { CorsOptions } from 'cors'
import { env } from '@config'
import corsMiddleware from 'cors'
import { DEVELOPMENT_ENV } from '@constants'

const corsOrigins = env.WHITE_LIST_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    const isDevelopmentEnv = env.NODE_ENV === DEVELOPMENT_ENV

    if (!origin || corsOrigins.includes(origin) || isDevelopmentEnv) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'), false)
  },
  optionsSuccessStatus: 200,
}

export const cors = corsMiddleware(corsOptions)
