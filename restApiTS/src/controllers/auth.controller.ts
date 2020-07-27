import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { registerValidation, loginValidation } from '../util/validationSchema';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists');

  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();

  const token: string = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET || 'jwt secret');

  res.header('Auth_token', token).status(201).json(token);
};

export const login = async (req: Request, res: Response) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Email not registered' });

  let correctPassword: boolean = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json({ message: 'Password incorrect' });

  const token: string = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'jwt secret', {
    expiresIn: 60 * 60 * 24
  });

  res.header('Auth-token', token).status(200).json(token);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json({ message: 'No user found' });
  res.status(200).json(user);
};
