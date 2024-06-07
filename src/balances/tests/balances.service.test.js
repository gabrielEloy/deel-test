const { FakeClient } = require("../../utils/test-utils");
const balancesService = require("../balances.service");
const balancesRepository = require("../balances.repository");

jest.mock("../balances.repository");

describe("balances service", () => {
  describe("Deposit", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should call the depositBalance method from the repository once and with the right params", async () => {
      const profile = FakeClient(1, "Test", 1000);
      const amount = 100;

      balancesRepository.depositBalance.mockResolvedValue({});

      await balancesService.depositBalance({ profile, amount });

      expect(balancesRepository.depositBalance).toHaveBeenCalledTimes(1);
      expect(balancesRepository.depositBalance).toHaveBeenCalledWith({
        profile,
        amount,
      });
    });
  });
});
