const express = require('express');
const { getProfile,  profileValidator } = require('../middleware');
const contractsController = require('../contracts/contract.controller');
const { contractsSchemaValidator } = require('../contracts/contracts.schemaValidators');

const contractsRouter = express.Router();

contractsRouter.get('/', profileValidator, getProfile, contractsController.getAll);
contractsRouter.get('/:id', contractsSchemaValidator, getProfile, contractsController.getById);

module.exports = contractsRouter;