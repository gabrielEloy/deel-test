const { Profile: ModelProfile } = require("../model");

async function getProfile({ id, Profile = ModelProfile }) {
  const profile = await Profile.findOne({ where: { id } });

  return profile;
}

module.exports = { getProfile };
