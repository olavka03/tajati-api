export interface ApiError extends Error {
  isOperational?: boolean
  statusCode?: number
}
