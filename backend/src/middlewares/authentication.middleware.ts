import * as admin from 'firebase-admin'
import { NextFunction, Request, Response } from 'express'

const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const idToken = authHeader.split(' ')[1]
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function () {
        return next()
      })
      .catch(function (error) {
        console.log(error)
        return res.sendStatus(401)
      })
  } else {
    res.sendStatus(401)
  }
}

export default authenticateJWT
