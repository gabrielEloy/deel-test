const getProfile = require("./getProfile");
const profileRepository = require("../../profile/profile.repository");

jest.mock("../../profile/profile.repository");

let reqMock;
let resMock;
let nextMock;

describe("getProfile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    profileRepository.getProfile = jest.fn();
    reqMock = {
      params: {},
      headers: {},
    };

    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };

    nextMock = jest.fn();
  });

  it("Should successfully add the profile to the request object when profile_id is present", async () => {
    const profileMock = {
      id: 1,
      name: "Test",
      balance: 1000,
    };

    reqMock.headers["profile_id"] = 1;

    profileRepository.getProfile.mockResolvedValue(profileMock);

    await getProfile(reqMock, resMock, nextMock);

    expect(reqMock.profile).toEqual(profileMock);
  });

  it("Should throw an error when the queried profile does not exist", async () => {
    await getProfile(reqMock, resMock, nextMock);

    profileRepository.getProfile.mockResolvedValue(null);

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Unauthorized: Invalid profile ID",
    });
  });
});
