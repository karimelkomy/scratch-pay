const { Given, When, Then } = require("cucumber");
const axios = require("axios");
const { expect } = require("chai");

Given("a date of {string}", async function (date) {
  const url = `http://localhost:3000/api/v1/isBusinessDay?date=${date}`;

  this.response = await axios.get(url);
});

When("I check if it is a business day", function () {});

Then("the response should be {string}", function (status) {
  expect(this.response.status).to.equal(200);
  expect(this.response.data).to.have.property("ok", true);
  expect(this.response.data.results.toString()).to.equal(status);
});

Then("the response should be an error message", function () {
  expect(this.response.status).to.equal(200);
  expect(this.response.data).to.have.property("ok", false);
  expect(this.response.data).to.have.property(
    "errorMessage",
    "A valid date is required"
  );
});
