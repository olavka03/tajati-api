import express from 'express'

export const json = express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString('utf-8')
  },
})
