"use strict";
const express = require("express");
const router = express.Router();
const users = require("../models").User;
const portfolioUserRouter = require("./portfolioUsers/portfolioUsers");

router.get("/api", async (req, res) => {
  res.status(200).send({
    message: "Welcome to the Index API!",
  });
});

router.use("/portfolioUser", portfolioUserRouter);

router.post("/user", async (req, res) => {
  try {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: Number(req.body.age) || 0,
    };
    const result = await users.create({
      ...userData
    });
    console.log(result);
    res.status(200).send({
      user: userData,
    });
  } catch (error) {
    console.log("Ha habido un error: ", error);
    res.status(500).send({
      message: "Something failed!!!",
    });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const user = await users.findOne({
      where: { id: req.params.id }
    });
    if (!user) {
      res.status(404).send({
        message: "User not found...",
      });
      return;
    }
    console.log(user.id, user.firstName);
    const userUpdate = {
      firstName: req.body.firstName ?? user.firstName,
      lastName: req.body.lastName ?? user.lastName,
      email: req.body.email ?? user.email,
      age: (Number(req.body.age) || 0) ?? user.age,
    };
    const result = await user.update({
      ...userUpdate
    });

    res.status(200).send({
      user: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something failed!!!",
    });
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const user = await users.findOne({
      where: { id: req.params.id }
    });
    if (!user) {
      res.status(404).send({
        message: "User not found...",
      });
      return;
    }

    const userUpdate = {
      firstName: req.body.firstName ?? user.firstName,
      lastName: req.body.lastName ?? user.lastName,
      email: req.body.email ?? user.email,
      age: (Number(req.body.age) || 0) ?? user.age,
    };
    const result = await users.update({
      ...userUpdate
    });

    res.status(200).send({
      user: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something failed!!!",
    });
  }
});

module.exports = router;