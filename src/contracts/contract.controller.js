const contractService = require("./contract.service");
const { NotFound } = require("http-errors");

async function getById(req, res) {
  const { id } = req.params;
  const profile = req.profile;

  const contract = await contractService.getById({ id, profile });

  if (!contract) {
    return res
      .status(404)
      .json({
        error: "No contract found",
      })
      .end();
  }

  res.json(contract);
}

async function getAll(req, res) {
  const profile = req.profile;

  const contracts = await contractService.getAllNotTerminated({ profile });

  if (!contracts.length) {
    return res
      .status(204)
      .json(contracts)
      .end();
  }

  res.json(contracts);
}

module.exports = { getById, getAll };
