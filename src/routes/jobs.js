const express = require('express');
const { getProfile, profileValidator } = require('../middleware');
const jobsController = require('../jobs/jobs.controller');

const jobsRouter = express.Router();

jobsRouter.get('/unpaid', profileValidator, getProfile, jobsController.getAllUnpaid);
jobsRouter.post('/:job_id/pay', profileValidator, getProfile, jobsController.payJob);


module.exports = jobsRouter;