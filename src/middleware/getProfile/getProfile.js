const profileRepository = require("../../profile/profile.repository");

const getProfile = async (req, res, next) => {
  try {
    const profileId = req.headers["profile_id"];
    const profile = await profileRepository.getProfile({ id: profileId });

    if (!profile) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid profile ID" });
    }

    req.profile = profile;
    next();
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = getProfile;
