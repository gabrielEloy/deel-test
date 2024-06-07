const { getFilterByProfileType } = require("./utils");
const {
  Job: ModelJob,
  Contract: ModelContract,
  Profile: ModelProfile,
  sequelize: modelSequelize,
} = require("../model");
const { canClientPay } = require("./utils");
const { Op } = require("sequelize");
const { Forbidden, NotFound, BadRequest } = require("http-errors");

async function getAllUnpaidJobs({
  profile,
  Contract = ModelContract,
  Job = ModelJob,
}) {
  const profileFilter = getFilterByProfileType(profile);

  return Job.findAll({
    where: {
      paid: null,
    },
    include: {
      model: Contract,
      where: {
        status: "in_progress",
        ...profileFilter,
      },
      attributes: [],
    },
  });
}

async function payJob({
  profile,
  jobId,
  Job = ModelJob,
  Profile = ModelProfile,
  sequelize = modelSequelize,
  Contract = ModelContract,
}) {
  const transaction = await sequelize.transaction();

  try {
    const job = await Job.findOne(
      {
        where: { id: jobId },
        include: [
          {
            model: Contract,
            where: { status: { [Op.ne]: "terminated" }, ClientId: profile.id },
          },
        ],
      },
      { transaction }
    );

    if (!job)
      throw new NotFound("Job not found or contract already terminated");
    if (job.paid) throw new BadRequest("Job already paid");

    const client = await Profile.findByPk(job.Contract.ClientId, {
      transaction,
    });
    const contractor = await Profile.findByPk(job.Contract.ContractorId, {
      transaction,
    });

    if (!canClientPay(client, job)) throw new Forbidden("Insufficient balance");

    job.paid = true;
    job.paymentDate = new Date();
    client.balance -= job.price;
    contractor.balance += job.price;

    if (job.Contract.status === "new") {
      job.Contract.status = "in_progress";
    }

    await job.save({ transaction });
    await job.Contract.save({ transaction });
    await client.save({ transaction });
    await contractor.save({ transaction });
    await transaction.commit();

    return job;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  getAllUnpaidJobs,
  payJob
};
