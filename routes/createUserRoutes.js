import express from "express";
import User from "../models/usermodel";
import { getToken } from "../util";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password" });
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const registerUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
  });
  const newUser = await registerUser.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data" });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Zachary",
      email: "zacharyigould@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
