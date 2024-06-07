const adminService = require("./admin.service");

async function findBestProfession(req, res, next) {
  const { start, end } = req.query;

  try {
    const bestProfession = await adminService.findBestProfession({
      startDate: start,
      endDate: end,
    });

    res.json(bestProfession);
  } catch (error) {
    next(error);
  }
}

async function findBestClients(req, res, next) {
  try {
    const { start, end, limit = 2 } = req.query;

    const bestClients = await adminService.findBestClients({
      start,
      end,
      limit,
    });

    res.json(bestClients);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

module.exports = { findBestProfession, findBestClients };
