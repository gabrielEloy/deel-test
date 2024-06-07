const balancesRepository = require("./balances.repository");

async function depositBalance({ profile, amount }) {
  return balancesRepository.depositBalance({ profile, amount });
}

module.exports = { depositBalance };
