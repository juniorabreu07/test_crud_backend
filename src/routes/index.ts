import UserRoute from './user.route'
import Auth from './auth.route'
const routes = [Auth, UserRoute];
const versionAPi = "/api/v1";

export default (app: any) => {
  routes.forEach((route: any) => {
    route(app, versionAPi)
  })
}