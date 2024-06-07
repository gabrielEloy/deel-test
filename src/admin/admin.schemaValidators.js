const { query, validationResult } = require("express-validator");

const AdminValidator = [
  query("start")
    .exists()
    .withMessage("Start Date is required in query params"),
    query("end")
    .exists()
    .withMessage("End Date is required in query params"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { AdminValidator };
