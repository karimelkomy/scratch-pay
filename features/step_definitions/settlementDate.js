const { Given, When, Then } = require("cucumber");
const axios = require("axios");
const { expect } = require("chai");

Given(
  "the initialDate {string}, and delay {int}",
  async function (initialDate, delay) {
    let url = `http://127.0.0.1:3000/api/v1/settlementDate?initialDate=${initialDate}&delay=${delay}`;
    this.response = await axios.get(url);
  }
);

Given(
  "the initialDate {string}, delay {int}, and country {string}",
  async function (initialDate, delay, country) {
    let url = `http://127.0.0.1:3000/api/v1/settlementDate?initialDate=${initialDate}&delay=${delay}&country=${country}`;

    this.response = await axios.get(url);
  }
);

Then("the response status code should be {int}", function (expectedStatus) {
  expect(this.response.status).to.equal(expectedStatus);
});

Then("the response should indicate success", function () {
  expect(this.response.data.ok).to.be.true;
});

Then("the response should indicate failure", function () {
  expect(this.response.data.ok).to.be.false;
});

Then(
  "the response should contain initialQuery with initialDate: {string} and delay: {string}",
  function (initialDate, delay) {
    expect(this.response.data.initialQuery).to.have.property(
      "initialDate",
      initialDate
    );
    expect(this.response.data.initialQuery).to.have.property("delay", delay);
  }
);

Then(
  "the response should contain initialQuery with initialDate: {string}, delay: {string}, and country: {string}",
  function (initialDate, delay, country) {
    expect(this.response.data.initialQuery).to.have.property(
      "initialDate",
      initialDate
    );
    expect(this.response.data.initialQuery).to.have.property("delay", delay);
    expect(this.response.data.initialQuery).to.have.property(
      "country",
      country
    );
  }
);

Then(
  "the response should contain results with holidayDays: {int}, totalDays: {int}, weekendDays: {int}, and businessDate: {string}",
  function (holidayDays, totalDays, weekendDays, businessDate) {
    expect(this.response.data.results).to.have.property(
      "holidayDays",
      holidayDays
    );
    expect(this.response.data.results).to.have.property("totalDays", totalDays);
    expect(this.response.data.results).to.have.property(
      "weekendDays",
      weekendDays
    );
    expect(this.response.data.results).to.have.property(
      "businessDate",
      businessDate
    );
  }
);

Then(
  "the response should contain errorMessage: {string}",
  function (errorMessage) {
    expect(this.error).to.have.property("errorMessage", errorMessage);
  }
);
