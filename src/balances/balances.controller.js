const balancesService = require("./balances.service");

async function deposit(req, res, next) {
  const { amount } = req.body;
  const profile = req.profile;

  try {
    const client = await balancesService.depositBalance({
      profile,
      amount,
    });

    res.json(client);
  } catch (error) {
    next(error);
  }
}

module.exports = { deposit };
