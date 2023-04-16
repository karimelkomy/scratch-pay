# API tests

Add tests for medical practice dashboard deployed to https://qa-challenge-api.scratchpay.com/api for two scenarios using both Jest and Cucumber

### Tests using Jest

The tests are located in the tests folder and can be run as part of CI/CD.
It uses the Jest testing framework and the Axios library for making HTTP requests to the API

To run Tests

you have to go to api-tests folder and run below:

```
yarn test
```

### Tests using Cucumber

The tests are written in cucumber located in the features folder and step definations under features/step_definations and can be run as part of CI/CD.

To run Tests

you have to go to api-tests folder and run below:

```
yarn test:cucumber
```

### Test Coverage

The tests cover the functionality of medical practice dashboard APIs for both scenario 1 and 2. The test coverage includes testing for positive and negative scenarios, and for all endpoints and error conditions.
