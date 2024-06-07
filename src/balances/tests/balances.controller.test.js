const balancesService = require("../balances.service");
const balancesController = require("../balances.controller");
const { FakeClient } = require("../../utils/test-utils");

jest.mock("../balances.service");

let reqMock;
let resMock;
let nextMock;

describe("Balances controller", () => {
  beforeEach(() => {
    reqMock = {
      params: {},
      profile: {},
    };

    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };

    nextMock = jest.fn();
  });

  describe("deposit", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should call the depositBalance method from the service once and with the right params", async () => {
      const profile = FakeClient(1, "Test", 1000);
      const amount = 100;

      reqMock.body = { amount };
      reqMock.profile = profile;

      //The result itself isn't what we're testing, so let's use an empty object
      const mockRes = {};

      balancesService.depositBalance.mockResolvedValue(mockRes);

      await balancesController.deposit(reqMock, resMock, nextMock);

      expect(balancesService.depositBalance).toHaveBeenCalledTimes(1);
      expect(balancesService.depositBalance).toHaveBeenCalledWith({
        profile,
        amount,
      });
    });

    it("should call the next function with the error if the service throws an error", async () => {
      const profile = FakeClient(1, "Test", 1000);
      const amount = 100;

      reqMock.body = { amount };
      reqMock.profile = profile;

      const error = new Error("Test error");

      balancesService.depositBalance.mockRejectedValue(error);

      await balancesController.deposit(reqMock, resMock, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
