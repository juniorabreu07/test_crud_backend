import UserRoute from './user.route'
import Auth from './auth.route'
import productRoute from './product.route';
const routes = [Auth, productRoute, UserRoute];
const versionAPi = "/api/v1";

export default (app: any) => {
  routes.forEach((route: any) => {
    route(app, versionAPi)
  })
}