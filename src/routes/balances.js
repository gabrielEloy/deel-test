const express = require("express");
const { getProfile } = require("../middleware");
const balancesController = require("../balances/balances.controller");
const { balancesValidator } = require("../balances/balances.schemaValidators");

const balancesRouter = express.Router();

balancesRouter.post(
  "/deposit/:userId",
  balancesValidator,
  getProfile,
  balancesController.deposit
);

module.exports = balancesRouter;
