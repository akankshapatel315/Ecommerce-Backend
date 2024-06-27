import {Response,Request}  from "express"
const jwt = require("jsonwebtoken")

const authenticateToken = (req:any, res:Response, next:Function) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access token not found' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err:any, user:any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  };


  module.exports={ authenticateToken}