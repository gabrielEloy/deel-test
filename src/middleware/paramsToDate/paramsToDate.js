const parseQueryParamDates =
  (...params) =>
  (req, res, next) => {
    try {
      Object.entries(req.query).forEach(([key, value]) => {
        if (params.includes(key)) {
          if (!Date.parse(value)) {
            return res.status(400).json({ error: "Invalid date query param" })
          }
          req.query[key] = new Date(value);
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = parseQueryParamDates;
