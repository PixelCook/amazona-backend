import express from "express";
import User from "../models/usermodel";

const router = express.Router();

router.get("/api/users/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "zach",
      email: "zacharyigould@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router