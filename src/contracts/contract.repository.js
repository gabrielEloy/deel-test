const { Contract: ModelContract } = require("../model");
const { Op } = require("sequelize");
const { getFilterByProfileType } = require("./utils");

async function findContractById({ id, profile, Contract = ModelContract }) {
  const profileFilter = await getFilterByProfileType(profile);

  const contract = await Contract.findOne({
    where: {
      id,
      ...profileFilter,
    },
  });

  return contract;
}

async function findAllContractsByProfile({
  profile,
  excludeTerminated,
  Contract = ModelContract,
}) {
  const profileFilter = getFilterByProfileType(profile);

  return Contract.findAll({
    where: {
      ...profileFilter,
      ...(excludeTerminated && { [Op.not]: { status: "terminated" } }),
    },
  });
}

module.exports = {
  findContractById,
  findAllContractsByProfile,
};
