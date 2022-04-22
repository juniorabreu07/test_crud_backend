

import { Router, Request, Response, NextFunction } from 'express'
import { User } from "../db/models";
import { UserInterface } from '../interfaces';
import { response } from '../utils';
require('dotenv').config()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret_key = process.env.MY_SECRET_KEY_JWT;
export const signup = async (req: Request, res: Response) => {
  try {
    const userParams: UserInterface = req.body as UserInterface;
    let user = await User.create({
      username: userParams.username,
      email: userParams.email,
      nombres: userParams.nombres,
      apellidos: userParams.apellidos,
      password: bcrypt.hashSync(userParams.password, 8),
    });
    // delete user.password;

    response(false, { message: "User registered successfully!", user: user }, res, 200);
  } catch (error: any) {
    response(true, { message: error.message }, res, 500);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const user = await User.findOne({
      where: {
        email: params.email,
      },
    });

    if (!user) {
      return response(true, { message: "User Not found." }, res, 404);
    }

    const passwordIsValid = bcrypt.compareSync(
      params.password,
      user.password
    );

    if (!passwordIsValid) {
      return response(true, { message: "Invalid Password!" }, res, 404);
    }

    const token = jwt.sign({ id: user.id }, secret_key, {
      expiresIn: 86400, // 24 hours
    });

    req.session = { token };
    return response(false, {
      id: user.id,
      username: user.username,
      email: user.email,
      token
    }, res, 200);
  } catch (error: any) {
    return response(true, { message: error.message }, res, 500);
  }
};

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    next(err);
  }
};