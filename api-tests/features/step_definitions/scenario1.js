const { Given, When, Then } = require("cucumber");
const axios = require("axios");
const { expect } = require("chai");

let jwtToken;
let responseStatus;

Given("user is logged in with valid credentials", async function () {
  const response = await axios.get(
    "https://qa-challenge-api.scratchpay.com/api/auth",
    {
      params: {
        email: "gianna@hightable.test",
        password: "thedantonio1",
      },
    }
  );

  jwtToken = response.data.data.session.token;
  responseStatus = response.status;
});

When("user tries to log in with invalid email and password", async function () {
  try {
    await axios.get("https://qa-challenge-api.scratchpay.com/api/auth", {
      params: {
        email: "invalid-email",
        password: "invalid-password",
      },
    });

    responseStatus = 200;
  } catch (error) {
    responseStatus = error.response.status;
  }
});

When(
  "user tries to get the list of email addresses for practice id {int}",
  async function (practiceId) {
    try {
      await axios.get(
        `https://qa-challenge-api.scratchpay.com/api/clinics/${practiceId}/emails`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      responseStatus = 200;
    } catch (error) {
      responseStatus = error.response.status;
    }
  }
);

Given("user is logged in with an invalid JWT token", async function () {
  jwtToken = "invalid_token";
});

Then(
  "user should receive a response with status code {int}",
  function (statusCode) {
    expect(responseStatus).to.equal(statusCode);
  }
);

Then("user should receive a JWT token", function () {
  expect(jwtToken).to.exist;
});
