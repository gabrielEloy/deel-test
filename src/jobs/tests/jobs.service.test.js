const jobsService = require("../jobs.service");
const jobsRepository = require("../jobs.repository");
const { FakeClient } = require("../../utils/test-utils");

jest.mock("../jobs.repository");

describe("jobs service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const profile = FakeClient(1, "test", 1000);

  describe("When testing getAllUnpaidJobs", () => {
    beforeEach(() => {
      jobsRepository.getAllUnpaidJobs = jest.fn();
    });

    it("should successfully retrieve all unpaid jobs", async () => {
      const unpaidJobs = [
        {
          description: "work",
          price: 200,
          ContractId: 1,
        },
      ];

      jobsRepository.getAllUnpaidJobs.mockResolvedValue(unpaidJobs);

      const result = await jobsService.getAllUnpaidJobs({
        profile,
      });

      expect(result).toEqual(unpaidJobs);
    });

    it("Should call the Jobs Repository once with the correct arguments", async () => {
      const unpaidJobs = [
        {
          description: "work",
          price: 200,
          ContractId: 1,
        },
      ];

      jobsRepository.getAllUnpaidJobs.mockResolvedValue(unpaidJobs);

      await jobsService.getAllUnpaidJobs({
        profile,
      });

      expect(jobsRepository.getAllUnpaidJobs).toHaveBeenCalledWith({ profile });
      expect(jobsRepository.getAllUnpaidJobs).toHaveBeenCalledTimes(1);
    });
  });

  describe("When testing payJob", () => {
    beforeEach(() => {
      jobsRepository.payJob = jest.fn();
    });

    it("should successfully pay a job", async () => {
      const jobId = 1;

      const payJobResponse = {};

      jobsRepository.payJob.mockResolvedValue(payJobResponse);

      const result = await jobsService.payJob({
        profile,
        jobId,
      });

      expect(result).toBe(payJobResponse);
    });

    it("Should call the Jobs Repository once with the correct arguments", async () => {
      const jobId = 1;

      const payJobResponse = {};

      jobsRepository.payJob.mockResolvedValue(payJobResponse);

      const result = await jobsService.payJob({
        profile,
        jobId,
      });

      expect(result).toBe(payJobResponse);

      expect(jobsRepository.payJob).toHaveBeenCalledWith({ profile, jobId });
      expect(jobsRepository.payJob).toHaveBeenCalledTimes(1);
    });
  });
});
