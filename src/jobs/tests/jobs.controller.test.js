const jobsController = require("../jobs.controller");
const jobsService = require("../jobs.service");

jest.mock("../jobs.service");

let reqMock;
let resMock;
let nextMock;

describe("jobs controller", () => {
  beforeEach(() => {
    reqMock = {
      params: {},
      profile: {
        isClient: jest.fn().mockReturnValue(true),
      },
    };

    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };

    nextMock = jest.fn();
  });
  describe("When testing getAllUnpaid", () => {
    beforeEach(() => {
      jobsService.getAllUnpaidJobs = jest.fn();
    });
    it("Should successfully call res.json with all unpaid jobs when they are returned", async () => {
      const unpaidJobsMock = [
        {
          description: "work",
          price: 200,
          ContractId: 1,
        },
      ];

      jobsService.getAllUnpaidJobs.mockResolvedValue(unpaidJobsMock);

      await jobsController.getAllUnpaid(reqMock, resMock, nextMock);

      expect(resMock.json).toHaveBeenCalledWith(unpaidJobsMock);
    });

    it("Should successfully call res.json with http 204 unpaid jobs when they are returned empty", async () => {
      const unpaidJobsMock = [];

      jobsService.getAllUnpaidJobs.mockResolvedValue(unpaidJobsMock);

      await jobsController.getAllUnpaid(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(204);
    });

    it("Should call next with error when getAllUnpaidJobs throws an error", async () => {
      const error = new Error("error");
      jobsService.getAllUnpaidJobs.mockRejectedValue(error);

      await jobsController.getAllUnpaid(reqMock, resMock, nextMock);

      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe("When testing payJob", () => {
    beforeEach(() => {
      jobsService.payJob = jest.fn();
    });

    it("Should return 403 when profile is not a client", async () => {
      reqMock.profile.isClient = jest.fn().mockReturnValue(false);
      await jobsController.payJob(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(403);
    });

    it('Should call payJob with the jobId and profile when profile is a client', async () => {
      reqMock.profile.isClient = jest.fn().mockReturnValue(true);
      reqMock.params.job_id = 1;

      await jobsController.payJob(reqMock, resMock, nextMock);

      expect(jobsService.payJob).toHaveBeenCalledWith({
        jobId: 1,
        profile: reqMock.profile,
      });
    });

    it('Should call res.json with the payJob result', async () => {
      const payJobMock = {
        description: 'work',
        price: 200,
        ContractId: 1,
      };

      jobsService.payJob.mockResolvedValue(payJobMock);

      await jobsController.payJob(reqMock, resMock, nextMock);

      expect(resMock.json).toHaveBeenCalledWith(payJobMock);
    });

    it('Should call next with error when payJob throws an error', async () => {
      const error = new Error('error');
      jobsService.payJob.mockRejectedValue(error);

      await jobsController.payJob(reqMock, resMock, nextMock);

      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
