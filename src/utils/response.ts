import { Response } from 'express'

const response = (
  error: boolean,
  data: Record<string, unknown> | string,
  res: Response,
  status: number
): void => {
  res.status(status).send({ error, data })
}

export { response }
