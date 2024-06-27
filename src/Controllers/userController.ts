const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
import { v2 as cloudinary } from "cloudinary";
import { Response, Request } from "express";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const photoURL = await photoUpload(username);
    if(!photoURL)
      {
        return   res.status(500).json({ message: 'Some Error occured while image uploading' });
      }
      const user = await User.create({
      username,
      email,
      password: hashedPassword,
      imageUrl:photoURL?.url
    });
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ ...user, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const photoUpload = async (username:string) => {
  const uploadResult = await cloudinary.uploader
    .upload(
      "D:/photos/Resort/IMG_20210306_163840_244.jpg",
      {
        public_id: username,
      }
    )
    .catch((error: any) => {
      return error;
    });

  return uploadResult;

  // const optimizeUrl = cloudinary.url('clothes22', {
  //  fetch_format: 'auto',
  //  quality: 'auto'
  // });

  // const autoCropUrl = cloudinary.url('clothes22', {
  //  crop: 'auto',
  //  gravity: 'auto',
  //  width: 500,
  //  height: 500,
  // });
};

module.exports = { login, register, photoUpload };
