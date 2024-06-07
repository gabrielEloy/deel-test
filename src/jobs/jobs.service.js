const jobsRepository = require("./jobs.repository");

async function getAllUnpaidJobs({ profile }) {
  const unpaidJobs = await jobsRepository.getAllUnpaidJobs({ profile });

  return unpaidJobs;
}

async function payJob({ profile, jobId }) {
  return jobsRepository.payJob({ profile, jobId });
}

module.exports = { getAllUnpaidJobs, payJob };
