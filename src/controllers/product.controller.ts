
import { Request, Response } from 'express'
import { Product } from "../db/models";
import { ProductInterface } from '../interfaces';
import { response } from '../utils';

export const show = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    });
    if (product) {
      response(false, product as any, res, 200);
    } else {
      response(true, { message: "Producto no existe" }, res, 404);
    }
  } catch (err: any) {
    console.log(err);
    response(true, { message: err.message || "error buscando el producto" }, res, 500)
  }
}

export const index = async (req: Request, res: Response) => {
  Product.findAll()
    .then(data => {
      response(false, data as any, res, 200)
    })
    .catch(err => {
      response(false, { message: err.message || "No se pudieron obtener los productos" }, res, 500)
    });
}
export const create = async (req: any, res: Response) => {
  try {
    const productParams: ProductInterface = req.body as ProductInterface;
    console.log(" req.productParams", productParams)
    const logo: string = req["file"] ? req["file"].path : "";
    const product = await Product.create({
      descripcion: productParams.descripcion,
      nombre: productParams.nombre,
      precio: productParams.precio,
      logo: logo
    });

    response(false, { message: "product registered successfully!", product: product }, res, 200);

  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const productParams: ProductInterface = req.body as ProductInterface;
    console.log(" req.body0", req.body)
    console.log(" req.body0", req.query)
    const logo: string = req["file"] ? req["file"].path : "";
    const data: any = {
      descripcion: productParams.descripcion,
      nombre: productParams.nombre,
      precio: productParams.precio,
      logo: logo,
      id: productParams.id,
    }
    console.log("logo", logo)
    console.log("data", data)
    if (!logo) {
      delete data["logo"];
    }
    if (data.id) {
      const product = await Product.update(data, { where: { id: parseInt(data.id) } });
      response(false, { message: "product registered successfully!", product: product }, res, 200);
    } else {
      const fs = require('fs')

      if (logo) {
        fs.unlinkSync(logo);
      }
      response(false, { message: "product not found!" }, res, 402);
    }

  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const rowDeleted = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (rowDeleted == 1) {
      response(false, { message: "product deleted successfully!" }, res, 200);
    } else {
      response(false, { message: "product not found!" }, res, 404);
    }
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}