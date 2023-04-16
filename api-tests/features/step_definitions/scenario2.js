const axios = require("axios");
const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

const API_URL = "https://qa-challenge-api.scratchpay.com/api";

let jwtToken;

Given("a user with no authentication", async function () {});

When(
  "they attempt to search for clinics with the term {string}",
  async function (term) {
    try {
      await axios.get(`${API_URL}/clinics`, {
        params: { term },
      });
    } catch (error) {
      this.error = error;
    }
  }
);

Then("they receive a 401 error response", function () {
  expect(this.error.response.status).to.equal(401);
});

Given("a logged-in user", async function () {
  const response = await axios.get(`${API_URL}/auth`, {
    params: {
      email: "gianna@hightable.test",
      password: "thedantonio1",
    },
  });

  jwtToken = response.data.data.session.token;
});

When("they search for clinics with the term {string}", async function (term) {
  try {
    this.response = await axios.get(`${API_URL}/clinics`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: { term },
    });
  } catch (error) {
    this.error = error;
  }
});

Then("they receive a list of clinics that match the search term", function () {
  expect(this.response.status).to.equal(200);
  expect(this.response.data).to.have.property("ok", true);
  expect(this.response.data.data.length).to.be.greaterThan(0);
});

Then("each clinic name contains the word {string}", function (term) {
  this.response.data.data.forEach((item) => {
    expect(item.displayName.toLowerCase()).to.contain(term);
  });
});

Then("they receive an empty list of clinics", function () {
  expect(this.response.status).to.equal(200);
  expect(this.response.data).to.have.property("ok", true);
  expect(this.response.data.data).to.have.length(0);
});
