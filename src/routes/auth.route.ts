import { Router } from 'express'
import * as constroller from "../controllers/auth.controller"
import middleware from "../middleware"

export default (app: any, versionAPi: string) => {
  app.post(`${versionAPi}/auth/signup`, [
    middleware.checkDuplicateUsernameOrEmail
  ], constroller.signup)
  app.post(`${versionAPi}/auth/signin`, constroller.signin)
  app.post(`${versionAPi}/auth/signout`, constroller.signout)

};
