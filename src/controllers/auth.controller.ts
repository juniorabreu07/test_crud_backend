

import { Router, Request, Response, NextFunction } from 'express'
import { User } from "../db/models";
import { UserInterface } from '../interfaces';
require('dotenv').config()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret_key = process.env.MY_SECRET_KEY_JWT;
export const signup = async (req: Request, res: Response) => {
  try {
    const userParams: UserInterface = req.body as UserInterface;
    const user = await User.create({
      username: userParams.username,
      email: userParams.email,
      nombres: userParams.nombres,
      apellidos: userParams.apellidos,
      password: bcrypt.hashSync(userParams.password, 8),
    });

    res.send({ message: "User registered successfully!", user: user });

  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const user = await User.findOne({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      params.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, secret_key, {
      expiresIn: 86400, // 24 hours
    });

    req.session = { token };

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
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