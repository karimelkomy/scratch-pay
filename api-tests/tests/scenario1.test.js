const axios = require("axios");

describe("Scenario 1", () => {
  beforeAll(async () => {
    const response = await axios.get(
      "https://qa-challenge-api.scratchpay.com/api/auth",
      {
        params: {
          email: "gianna@hightable.test",
          password: "thedantonio1",
        },
      }
    );

    this.jwtToken = response.data.data.session.token;
  });

  test("User with invalid credentials cannot log in", async () => {
    try {
      const response = await axios.get(
        "https://qa-challenge-api.scratchpay.com/api/auth",
        {
          params: {
            email: "invalid-email",
            password: "invalid-password",
          },
        }
      );

      expect(response.status).not.toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("User with valid credentials can log in and receive a JWT token", async () => {
    try {
      const response = await axios.get(
        "https://qa-challenge-api.scratchpay.com/api/auth",
        {
          params: {
            email: "gianna@hightable.test",
            password: "thedantonio1",
          },
        }
      );
      expect(response.status).toBe(200);
      expect(response.data.data.session.token).toBeDefined();

      return response.data.data.session.token;
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  test("Logged-in user with valid credentials is prevented from getting the list of email addresses of practice id 2", async () => {
    try {
      const response = await axios.get(
        "https://qa-challenge-api.scratchpay.com/api/clinics/2/emails",
        {
          headers: {
            Authorization: `Bearer ${this.jwtToken}`,
          },
        }
      );

      expect(response.status).not.toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Logged-in user with invalid JWT token is prevented from getting the list of email addresses", async () => {
    try {
      const response = await axios.get(
        "https://qa-challenge-api.scratchpay.com/api/clinics/2/emails",
        {
          headers: {
            Authorization: `Bearer invalid_token`,
          },
        }
      );

      expect(response.status).not.toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});
