import { HttpException } from '../exceptions/HttpException'
import { RequestHandler } from 'express'
import { ValidationError, validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

const getAllNestedErrors = (error: ValidationError) => {
  if (error.constraints) {
    return Object.values(error.constraints)
  }
  return error.children.map(getAllNestedErrors).join(',')
}

export const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    const obj = plainToInstance(type, req[value])
    console.log(obj)
    validate(obj, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map(getAllNestedErrors).join(', ')
        next(new HttpException(400, message))
      } else {
        next()
      }
    })
  }
}
