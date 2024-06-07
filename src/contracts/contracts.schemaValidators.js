const { header, validationResult, param } = require("express-validator");

const contractsSchemaValidator = [
  header("profile_id")
    .exists()
    .withMessage("Profile ID is required in headers"),
  param("id").toInt().isInt().withMessage("ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { contractsSchemaValidator };
