const express = require("express");
const { sequelize } = require("./model");
const { admin, balances, contracts, jobs } = require("./routes");
const { isHttpError } = require("http-errors");

const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    const { status, message } = error;
    return res.status(status).json({ error: message });
  }

  res.status(500).json({ error: "An Unexpected Error Ocurred" });
};

const app = express();

app.use(express.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/jobs", jobs);
app.use("/contracts", contracts);
app.use("/balances", balances);
app.use("/admin", admin);

app.use(errorHandler);

module.exports = app;
