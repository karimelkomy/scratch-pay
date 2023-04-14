const axios = require("axios");

describe("GET /api/v1/settlementDate", () => {
  it("should return the correct settlement date for a US-based initial date and delay", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=2023-04-14&delay=3"
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", true);
    expect(response.data.initialQuery).toHaveProperty(
      "initialDate",
      "2023-04-14"
    );
    expect(response.data.initialQuery).toHaveProperty("delay", "3");
    expect(response.data.results).toHaveProperty("holidayDays", 0);
    expect(response.data.results).toHaveProperty("totalDays", 5);
    expect(response.data.results).toHaveProperty("weekendDays", 2);
    expect(response.data.results).toHaveProperty(
      "businessDate",
      "2023-04-19T00:00:00.000Z"
    );
  });

  it("should return the correct settlement date for an Egypt-based initial date and delay", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=2023-04-13&delay=3&country=EG"
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", true);
    expect(response.data.initialQuery).toHaveProperty(
      "initialDate",
      "2023-04-13"
    );
    expect(response.data.initialQuery).toHaveProperty("delay", "3");
    expect(response.data.initialQuery).toHaveProperty("country", "EG");
    expect(response.data.results).toHaveProperty("holidayDays", 0);
    expect(response.data.results).toHaveProperty("totalDays", 4);
    expect(response.data.results).toHaveProperty("weekendDays", 2);
    expect(response.data.results).toHaveProperty(
      "businessDate",
      "2023-04-18T00:00:00.000Z"
    );
  });

  it("should return the same date when delay is 0", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=2023-04-14&delay=0"
    );
    console.log(response.data.results);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", true);
    expect(response.data.initialQuery).toHaveProperty(
      "initialDate",
      "2023-04-14"
    );
    expect(response.data.initialQuery).toHaveProperty("delay", "0");
    expect(response.data.results).toHaveProperty(
      "businessDate",
      "2023-04-14T00:00:00.000Z"
    );
    expect(response.data.results).toHaveProperty("holidayDays", 0);
    expect(response.data.results).toHaveProperty("totalDays", 0);
    expect(response.data.results).toHaveProperty("weekendDays", 0);
  });

  it("should return the next business day when initial date falls on a weekend", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=2023-04-15&delay=1"
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", true);
    expect(response.data.initialQuery).toHaveProperty(
      "initialDate",
      "2023-04-15"
    );
    expect(response.data.initialQuery).toHaveProperty("delay", "1");
    expect(response.data.results).toHaveProperty(
      "businessDate",
      "2023-04-17T00:00:00.000Z"
    );
    expect(response.data.results).toHaveProperty("holidayDays", 0);
    expect(response.data.results).toHaveProperty("totalDays", 1);
    expect(response.data.results).toHaveProperty("weekendDays", 1);
  });

  it("should return an error for an invalid country code", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=2023-04-14&delay=3&country=XX"
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", false);
    expect(response.data).toHaveProperty(
      "errorMessage",
      "A valid country is required"
    );
  });

  it("should return an error for an invalid date format", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=14-04-2023&delay=3"
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", false);
    expect(response.data).toHaveProperty(
      "errorMessage",
      "A valid date is required"
    );
  });

  it("should return an error for delay in negative", async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/settlementDate?initialDate=14-04-2023&delay=-3"
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("ok", false);
    expect(response.data).toHaveProperty(
      "errorMessage",
      "A valid delay is required"
    );
  });
});
