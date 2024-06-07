const { BadRequest } = require("http-errors");
const { Op } = require("sequelize");
const {
  sequelize: modelSequelize,
  Profile: ModelProfile,
  Contract: ModelContract,
  Job: ModelJob,
} = require("../model");
const { Transaction } = require("sequelize");
const { shouldPreventDeposit } = require("./balances.utils");

async function depositBalance({
  Profile = ModelProfile,
  Job = ModelJob,
  sequelize = modelSequelize,
  Contract = ModelContract,
  profile,
  amount,
}) {
  const transaction = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });

  try {
    const client = await Profile.findByPk(profile.id, { transaction });

    const toPay = await Job.sum(
      "price",
      {
        where: { paid: null },
        include: [
          {
            model: Contract,
            where: { status: { [Op.ne]: "terminated" }, ClientId: profile.id },
            attributes: [],
          },
        ],
      },
      { transaction }
    );

    if (shouldPreventDeposit(client, amount, toPay)) {
      throw new BadRequest("Your deposit exceeds the allowable limit.");
    }

    client.balance += amount;

    await client.save({ transaction });
    await transaction.commit();

    return client;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  depositBalance,
};
