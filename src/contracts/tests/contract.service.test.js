const contractService = require("../contract.service");
const contractRepository = require("../contract.repository");
const { FakeClient } = require("../../utils/test-utils");

jest.mock("../contract.repository");

describe("Contract Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When testing getById", () => {
    beforeEach(() => {
      contractRepository.findContractById = jest.fn();
    })
    
    it("Should return a contract", async () => {
      const profile = FakeClient(1, "John", 1000);
      const contractMock = {
        id: 1,
        description: "work",
        price: 200,
      };

      contractRepository.findContractById.mockResolvedValue(contractMock);

      const contract = await contractService.getById({ id: 1, profile});

      expect(contract).toEqual(contractMock);
    });

    it("Should call the contract repository with the correct params", async () => {
      const profile = FakeClient(1, "John", 1000);
      const contractId = 2;


      await contractService.getById({ id: contractId, profile });

      expect(contractRepository.findContractById).toHaveBeenCalledTimes(1);
      expect(contractRepository.findContractById).toBeCalledWith({
        profile,
        id: contractId,
      });
    });
  });

  describe("When testing getAllNotTerminated", () => {
    beforeEach(() => {
      contractRepository.findAllContractsByProfile = jest.fn();
    });

    it("should return all contracts that are not terminated", async () => {
      const profile = FakeClient(1, "John", 1000);
      const contractMock = [
        {
          id: 1,
          description: "work",
          price: 200,
        },
        {
          id: 2,
          description: "work",
          price: 200,
        },
      ];

      contractRepository.findAllContractsByProfile.mockResolvedValue(contractMock);

      const contracts = await contractService.getAllNotTerminated({ profile });

      expect(contracts).toEqual(contractMock);
    });

    it("Should call the contract repository with the correct params", async () => {
      const profile = FakeClient(1, "John", 1000);

      await contractService.getAllNotTerminated({ profile });

      expect(contractRepository.findAllContractsByProfile).toHaveBeenCalledTimes(1);
      expect(contractRepository.findAllContractsByProfile).toBeCalledWith({
        profile,
        excludeTerminated: true,
      });
    });
  })
});
