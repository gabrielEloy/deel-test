const { header, validationResult, body } = require("express-validator");

const balancesValidator = [
  header("profile_id")
    .exists()
    .withMessage("Profile ID is required in headers"),
  body("amount").toInt().isInt().withMessage("amount must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { balancesValidator };
