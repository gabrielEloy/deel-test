const contractRepository = require("./contract.repository");

async function getById({ profile, id }) {
  const contract = await contractRepository.findContractById({ profile, id });

  return contract;
}

async function getAllNotTerminated({ profile }) {
  const contracts = await contractRepository.findAllContractsByProfile({
    profile,
    excludeTerminated: true,
  });

  return contracts;
}

module.exports = { getById, getAllNotTerminated };
