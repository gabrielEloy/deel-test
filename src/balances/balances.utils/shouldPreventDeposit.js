const getDepositLimit = (toPay) => toPay * 0.25;

const shouldPreventDeposit = (client, amount, toPay) =>
  client.balance + amount > getDepositLimit(toPay);

module.exports = shouldPreventDeposit
