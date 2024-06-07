const contractService = require("../contract.service");
const contractController = require("../contract.controller");

jest.mock("../contract.service.js");

const reqMock = {
  app: {
    get: jest.fn((str) => ({})),
  },
  params: {},
  profile: {},
};

let resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};

describe("get contract by id", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
  });
  it("should return the contract", async () => {
    const fakeId = 1;
    const fakeContract = { terms: "bla" };

    const requestMock = { ...reqMock };
    requestMock.params.id = fakeId;

    contractService.getById.mockResolvedValue(fakeContract);

    await contractController.getById(requestMock, resMock);

    expect(resMock.json).toBeCalledWith(fakeContract);
  });

  it("should return 404 when no contract is found", async () => {
    contractService.getById.mockResolvedValue(null);
    await contractController.getById(reqMock, resMock);

    expect(resMock.status).toBeCalledWith(404);
  });
});

describe("get all non terminated contracts", () => {
  it("should throw an 204 error when no contracts are found", async () => {
    const result = [];

    contractService.getAllNotTerminated.mockResolvedValue(result);
    await contractController.getAll(reqMock, resMock);

    expect(resMock.status).toBeCalledWith(204);
  });

  it("should return all given contracts for a given user", async () => {
    const results = [
      {
        id: 1,
        terms: "bla bla bla",
        status: "terminated",
        ClientId: 1,
        ContractorId: 5,
      },
      {
        id: 2,
        terms: "bla bla bla",
        status: "terminated",
        ClientId: 1,
        ContractorId: 5,
      },
    ];
    contractService.getAllNotTerminated.mockResolvedValue(results);
    await contractController.getAll(reqMock, resMock);
    expect(resMock.json).toBeCalledWith(results);
  });
});
