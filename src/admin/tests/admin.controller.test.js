const adminController = require("../admin.controller");
const adminService = require("../admin.service");

jest.mock("../admin.service");

let reqMock;
let resMock;
let nextMock;

describe("Admin Controller", () => {
  beforeEach(() => {
    reqMock = {
      params: {},
      profile: {
        isClient: jest.fn().mockReturnValue(true),
      },
      query: {}
    };

    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };

    nextMock = jest.fn();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("findBestProfession", () => {
    beforeEach(() => {
      adminService.findBestProfession = jest.fn();
      reqMock.query.start = new Date();
      reqMock.query.end = new Date();
    });
    it("should call the findBestProfession method from the service once and with the right params", async () => {
      const bestProfessionMock = {
        profession: "Test",
        totalPaid: 1000,
      };

      adminService.findBestProfession.mockResolvedValue(bestProfessionMock);

      await adminController.findBestProfession(reqMock, resMock, nextMock);

      expect(adminService.findBestProfession).toHaveBeenCalledTimes(1);
      expect(adminService.findBestProfession).toHaveBeenCalledWith({
        startDate: reqMock.query.start,
        endDate: reqMock.query.end,
      });
    });

    it("Should call the next function with the error", async () => {
      adminService.findBestProfession.mockRejectedValue("error");

      await adminController.findBestProfession(reqMock, resMock, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith("error");
    });
  });
});
