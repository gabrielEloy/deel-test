const adminRepository = require("./admin.repository");

async function findBestProfession({ startDate, endDate }) {
  const bestProfessionResults = await adminRepository.findBestProfession({
    startDate,
    endDate,
  });

  return bestProfessionResults;
}

async function findBestClients({
  start,
  end
}) {
  const clients = await adminRepository.findBestClients({
    startDate: start,
    endDate: end,
  });
  
  if(!clients.length) return clients;

  const assembleClientFullName = (client) => {
    const firstName = client["Contract.Client.firstName"] || "";
    const lastName = client["Contract.Client.lastName"] || "";
    return `${firstName} ${lastName}`.trim();
  };

  return clients.map((client) => ({
    id: client["Contract.Client.id"],
    paid: client.totalPaid,
    fullName: assembleClientFullName(client),
  }));
}

module.exports = { findBestProfession, findBestClients };
