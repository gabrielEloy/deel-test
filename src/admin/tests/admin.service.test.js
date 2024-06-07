const adminService = require("../admin.service");
const adminRepository = require("../admin.repository");

jest.mock("../admin.repository");

describe("Admin Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("findBestProfession", () => {
    beforeEach(() => {
      adminRepository.findBestProfession = jest.fn();
    });

    it("should successfully return the best profession", async () => {
      const startDate = new Date();
      const endDate = new Date();

      const bestProfessionMock = {};

      adminRepository.findBestProfession.mockResolvedValue(bestProfessionMock);

      const bestProfession = await adminService.findBestProfession({
        startDate,
        endDate,
      });

      expect(bestProfession).toEqual(bestProfessionMock);
    });

    it("should call the findBestProfession method from the repository once and with the right params", async () => {
      const startDate = new Date();
      const endDate = new Date();

      adminRepository.findBestProfession.mockResolvedValue({});

      await adminService.findBestProfession({ startDate, endDate });

      expect(adminRepository.findBestProfession).toHaveBeenCalledTimes(1);
      expect(adminRepository.findBestProfession).toHaveBeenCalledWith({
        startDate,
        endDate,
      });
    });
  });

  describe("findBestClients", () => {
    beforeEach(() => {
      adminRepository.findBestClients = jest.fn();
    });

    it("should successfully return the best clients", async () => {
      const start = new Date();
      const end = new Date();

      const bestClientsMock = [
        {
          "Contract.Client.id": 1,
          totalPaid: 1000,
          "Contract.Client.firstName": "Test",
          "Contract.Client.lastName": "Test",
        },
      ];

      adminRepository.findBestClients.mockResolvedValue(bestClientsMock);

      const bestClients = await adminService.findBestClients({
        start,
        end,
      });

      expect(bestClients).toEqual([
        {
          id: 1,
          paid: 1000,
          fullName: "Test Test",
        },
      ]);
    });

    it("should call the findBestClients method from the repository once and with the right params", async () => {
      const start = new Date();
      const end = new Date();

      adminRepository.findBestClients.mockResolvedValue([]);

      await adminService.findBestClients({ start, end });

      expect(adminRepository.findBestClients).toHaveBeenCalledTimes(1);
      expect(adminRepository.findBestClients).toHaveBeenCalledWith({
        startDate: start,
        endDate: end,
      });
    });

    it("should return an empty array if no clients are found", async () => {
      const start = new Date();
      const end = new Date();

      adminRepository.findBestClients.mockResolvedValue([]);

      const bestClients = await adminService.findBestClients({
        start,
        end,
      });

      expect(bestClients).toEqual([]);
    });

    describe("When formatting the clients", () => {
      it("Should match the expected interface", async () => {
        const start = new Date();
        const end = new Date();

        const implementsExpectedInterface = (contract) => {
          const contractObjectKeys = Object.keys(contract);
          const hasExpectedKeys = ["id", "paid", "fullName"].every((key) =>
            contractObjectKeys.includes(key)
          );

          return hasExpectedKeys && contractObjectKeys.length === 3;
        };

        const bestClientsMock = [
          {
            "Contract.Client.id": 1,
            totalPaid: 1000,
            "Contract.Client.firstName": "Test",
            "Contract.Client.lastName": "Test",
            otherValues: 1234324,
          },
        ];

        adminRepository.findBestClients.mockResolvedValue(bestClientsMock);

        const bestClients = await adminService.findBestClients({
          start,
          end,
        });

        bestClients.forEach((client) => {
          expect(implementsExpectedInterface(client)).toEqual(true);
        });
      });


      it('Should assemble the full name correctly', async () => {
        const start = new Date();
        const end = new Date();

        const bestClientsMock = [
          {
            "Contract.Client.id": 1,
            totalPaid: 1000,
            "Contract.Client.firstName": "First",
            "Contract.Client.lastName": "Last",
          },
        ];

        adminRepository.findBestClients.mockResolvedValue(bestClientsMock);

        const bestClients = await adminService.findBestClients({
          start,
          end,
        });

        expect(bestClients[0].fullName).toEqual("First Last");
      })
    });
  });
});
