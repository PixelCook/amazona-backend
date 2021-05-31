import express from "express";
import User from "../models/usermodel";

const router = express.Router();

router.post("/signin"),
  async (req, res) => {
    const signinUser = await user.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
    } else {
      res.status(401).send({ msg: "Check username and password" });
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        _id: signinUser.id,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    }
  };

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
    res.send({ message: error.message });
  }
});

export default router;
