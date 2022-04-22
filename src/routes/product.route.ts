import { Router } from 'express'
import * as constroller from "../controllers/product.controller"
import middleware from "../middleware"

export default (app: any, versionAPi: string) => {
  app.get(`${versionAPi}/products`, [/* middleware.verifyToken */], constroller.index);
  app.get(`${versionAPi}/products/:id`, [/* middleware.verifyToken */], constroller.show);
  app.delete(`${versionAPi}/products/:id`, [/* middleware.verifyToken */], constroller.destroy);
  app.put(`${versionAPi}/products/:id`, [/* middleware.verifyToken */middleware.upload.single('logo')], constroller.update);
  app.post(`${versionAPi}/products`, [/* middleware.verifyToken */middleware.upload.single('logo')], constroller.create);
};
