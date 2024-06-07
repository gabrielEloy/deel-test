const request = require("supertest");
const app = require("../src/app");

/**
 * Note:
 * Due to time constraints, I created only a brief example of an end-to-end test.
 * In a real-world scenario, I would use environment variables to set up a separate
 * test database. Additionally, for a more complex database, I would need to spin
 * up a Docker container to run the tests.
 */

const { Contract } = app.get("models");
const testContractData = {
  id: 1,
  terms: "bla bla bla",
  status: "terminated",
  ClientId: 1,
  ContractorId: 5,
};
let testContractInstance;

describe("Contract Endpoints", () => {
  beforeAll(async () => {
    testContractInstance = await Contract.create(testContractData);
  });

  describe("GET /contracts/:id", () => {
    it("should return status 400 if profile_id is not provided", (done) => {
      request(app)
        .get("/contracts/1")
        .expect(400)
        .then((_res) => {
          done();
        })
        .catch((err) => done(err));
    });

    it("should return status 400 if id is not a number", (done) => {
      request(app)
        .get("/contracts/a")
        .set("profile_id", 1)
        .expect(400)
        .then((_res) => {
          done();
        })
        .catch((err) => done(err));
    });

    it("should return status 200 and the contract details for a valid id", (done) => {
      request(app)
        .get(`/contracts/${testContractInstance.id}`)
        .set("profile_id", testContractInstance.ClientId)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("terms");
          done();
        })
        .catch((err) => done(err));
    });

    it("should return status 404 if the contract does not exist", (done) => {
      request(app)
        .get("/contracts/25")
        .set("profile_id", 1)
        .expect(404)
        .then((_res) => {
          done();
        })
        .catch((err) => done(err));
    });
  });

  afterAll(async () => {
    const sequelize = app.get("sequelize");
    await testContractInstance.destroy();
    await sequelize.close();
  });
});
