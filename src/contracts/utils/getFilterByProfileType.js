const { ProfileTypes } = require("../../utils/constants");

function getFilterByProfileType(profile) {
  if (profile.type === ProfileTypes.CLIENT) {
    return { ClientId: profile.id };
  }
  return { ContractorId: profile.id };
}

module.exports = getFilterByProfileType;
