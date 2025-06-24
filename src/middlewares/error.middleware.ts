import { ApiError } from '@types'
import { NextFunction, Request, Response } from 'express'
import { ResponseStatus } from '@enums'

export function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.statusCode ?? 500
  const isOperational = err.isOperational ?? false

  console.error(`[${new Date().toISOString()}]`, err.stack)

  res.status(statusCode).json({
    status: statusCode >= 500 ? ResponseStatus.Error : ResponseStatus.Fail,
    message: statusCode >= 500 && !isOperational ? 'Something went wrong' : err.message,
  })
}
