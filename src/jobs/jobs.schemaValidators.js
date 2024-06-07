const { header, validationResult } = require("express-validator");

const profileValidator = [
  header("profile_id")
    .exists()
    .withMessage("Profile ID is required in headers"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { profileValidator };
