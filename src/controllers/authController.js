import { json } from "node:stream/consumers";
import { prisma } from "../config/db.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (userExists) {
    return res.status(400).json({
      error: "user already exists with this email",
    });
  }
  //hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  //create user
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  //generate web token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: { id: user.id, name: name, email: email },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //get user
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  //no user found===null
  if (!user) {
    return res.status(401).json({ error: "email or password incorrect" });
  }

  //verify password
  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "email or password incorrect" });
  }

  //generate web token
  const token = generateToken(user.id, res);

  res.json({
    status: "success",
    data: {
      user: { email: email, id: user.id },
      token,
    },
  });
};

const logOut = async (req, res) => {
  res.cookie("jwt", "", { expire: new Date(0), httpOnly: true });
  res.status(200).json({
    status: "succes",
    message: "Logged out successfully",
  });
};

export { register, login, logOut };
