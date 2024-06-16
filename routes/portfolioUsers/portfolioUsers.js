"use strict";
const express = require("express");
const portfolioUsersController = require("../../controllers/portfolioUsers/portfolioUsersController");
const router = express.Router();

router.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the catalogs API!",
  });
});

router.post(
  "/",
  portfolioUsersController.create
);

router.put(
  "/:portfolioUserId",
  portfolioUsersController.update
);
router.patch(
  "/:portfolioUserId",
  portfolioUsersController.update
);

router.get(
  "/:portfolioUserId",
  portfolioUsersController.byId
);

router.get(
  "/",
  portfolioUsersController.list
);

router.delete(
  "/:portfolioUserId",
  portfolioUsersController.destroy
);

module.exports = router;