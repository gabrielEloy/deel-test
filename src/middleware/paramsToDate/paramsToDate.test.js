const paramsToDate = require("./paramsToDate");

let reqMock;
let resMock;
let nextMock;

describe("paramsToDate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    reqMock = {
      query: {},
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

  it("Should successfully convert the date string to a Date object", () => {
    reqMock.query.date = "2021-09-01";

    paramsToDate("date")(reqMock, resMock, nextMock);

    expect(reqMock.query.date).toEqual(new Date("2021-09-01"));
  });
});
