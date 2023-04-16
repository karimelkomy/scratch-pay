const axios = require("axios");

const API_URL = "https://qa-challenge-api.scratchpay.com/api";

describe("Scenario 2: Search clinics by term", () => {
  beforeAll(async () => {
    const response = await axios.get(`${API_URL}/auth`, {
      params: {
        email: "gianna@hightable.test",
        password: "thedantonio1",
      },
    });

    this.jwtToken = response.data.data.session.token;
  });

  describe("Logged-out user", () => {
    test("is prevented from searching clinics by term", async () => {
      try {
        await axios.get(`${API_URL}/clinics`, {
          params: { term: "veterinary" },
        });
      } catch (error) {
        expect(error.response.status).toEqual(401);
      }
    });
  });

  describe("Logged-in user", () => {
    test("is able to search clinics by term that match clinic name", async () => {
      const response = await axios.get(`${API_URL}/clinics`, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
        params: { term: "veterinary" },
      });

      expect(response.status).toEqual(200);
      expect(response.data).toHaveProperty("ok", true);
      expect(response.data.data.length).toBeGreaterThan(0);

      response.data.data.forEach((item) => {
        expect(item.displayName.toLowerCase()).toContain("veterinary");
      });
    });

    test("is able to search clinics by a term that does not match any clinic names", async () => {
      const response = await axios.get(`${API_URL}/clinics`, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
        params: { term: "not-exist" },
      });

      console.log(response.data);

      expect(response.status).toEqual(200);
      expect(response.data).toHaveProperty("ok", true);
      expect(response.data.data).toHaveLength(0);
    });
  });
});
