const jobsService = require("./jobs.service");

async function getAllUnpaid(req, res, next) {
  const profile = req.profile;

  try {
    const unpaidJobs = await jobsService.getAllUnpaidJobs({
      profile,
    });

    if (!unpaidJobs.length) return res.status(204).json([]);

    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
}

async function payJob(req, res, next) {
  const { job_id } = req.params;
  const profile = req.profile;

  if (!req.profile.isClient())
    return res.status(403).json({ error: "Profile is not a client" });

  try {
    const payJob = await jobsService.payJob({
      jobId: job_id,
      profile,
    });

    res.json(payJob);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUnpaid, payJob };
