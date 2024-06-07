const {
  Job: ModelJob,
  Contract: ModelContract,
  Profile: ModelProfile,
  sequelize: modelSequelize,
} = require("../model");
const { Op, fn, col } = require("sequelize");

async function findBestClients({
  Job = ModelJob,
  Profile = ModelProfile,
  Contract = ModelContract,
  startDate,
  endDate,
  limit = 2,
}) {
  return Job.findAll({
    raw: true,
    attributes: [[fn("SUM", col("price")), "totalPaid"]],
    include: [
      {
        model: Contract,
        required: true,
        include: [
          {
            model: Profile,
            required: true,
            as: "Client",
            where: { type: "client" },
          },
        ],
      },
    ],
    where: {
      paymentDate: { [Op.between]: [startDate, endDate] },
      paid: true,
    },
    group: ["Contract.ClientId"],
    order: [[col("totalPaid"), "DESC"]],
    limit,
  });
}

async function findBestProfession({
  startDate,
  endDate,
  Job = ModelJob,
  sequelize = modelSequelize,
  Profile = ModelProfile,
  Contract = ModelContract,
}) {
  return Job.findAll({
    attributes: [
      [sequelize.col("profession"), "profession"],
      [sequelize.fn("SUM", sequelize.col("price")), "total"],
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: Contract,
        attributes: [],
        include: [
          {
            model: Profile,
            as: "Contractor",
            attributes: [],
          },
        ],
      },
    ],
    group: ["profession"],
    order: [[sequelize.col("total"), "DESC"]],
    limit: 1,
  });
}

module.exports = {
  findBestProfession,
  findBestClients,
};
