const axios = require("axios");

describe("Business Day API", () => {
  describe("GET /api/v1/isBusinessDay", () => {
    it("should return true for a business day", async () => {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/isBusinessDay?date=2023-04-14"
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("ok", true);
      expect(response.data.results).toBe(true);
    });

    it("should return false for a weekend day", async () => {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/isBusinessDay?date=2023-04-15"
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("ok", true);
      expect(response.data.results).toBe(false);
    });

    it("should return false for a holiday", async () => {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/isBusinessDay?date=2023-12-25"
      );
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("ok", true);
      expect(response.data.results).toBe(false);
    });

    it("should return an error message if no date is provided", async () => {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/isBusinessDay"
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("ok", false);
      expect(response.data).toHaveProperty(
        "errorMessage",
        "A valid date is required"
      );
    });

    it("should return an error for an invalid date format", async () => {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/isBusinessDay?date=14-04-2023"
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("ok", false);
      expect(response.data).toHaveProperty(
        "errorMessage",
        "A valid date is required"
      );
    });
  });
});
