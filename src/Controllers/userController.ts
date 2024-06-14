const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const config= require("../config/config")
import {Response,Request}  from "express"

const register = async (req:Request, res:Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password:hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  } 
};

const login = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ ...user,token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


module.exports= { login, register}