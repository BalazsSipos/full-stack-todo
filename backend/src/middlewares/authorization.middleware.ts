import * as admin from 'firebase-admin'
import { NextFunction, Request, Response } from 'express'

export const authorizeOwnUserRequest = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const idToken = authHeader.split(' ')[1]
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedIdToken) {
        if (decodedIdToken.email !== req.params.email) {
          return res.sendStatus(403)
        }
        return next()
      })
      .catch(function (error) {
        console.log(error)
        return res.sendStatus(403)
      })
  } else {
    res.sendStatus(401)
  }
}
