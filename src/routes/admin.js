const express = require("express");
const adminController = require("../admin/admin.controller");
const { parseQueryParamDates } = require("../middleware");
const { AdminValidator } = require("../admin/admin.schemaValidators");

const adminRouter = express.Router();

adminRouter.get(
  "/best-profession",
  AdminValidator,
  parseQueryParamDates("start", "end"),
  adminController.findBestProfession
);
adminRouter.get(
  "/best-clients",
  AdminValidator,
  parseQueryParamDates("start", "end"),
  adminController.findBestClients
);

module.exports = adminRouter;
