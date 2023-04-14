# Business Day Checker

Returns the number of business days it will take for a payment to be allocated into an account.

## Run Locally

```
npm install
npm start
```

## API

The entire API is accessible under `/api/v1` and the following endpoints are available:

- `GET /api/v1/settlementDate`
- `GET /api/v1/isBusinessDay`

## Tests

### Tests using Jest

The tests are located in the tests folder and can be run as part of CI/CD.
It uses the Jest testing framework and the Axios library for making HTTP requests to the API

To run Tests

```
yarn test
```

### Tests using Cucumeber

The tests are written in cucumber located in the features folder and step definations under features/ste_definations and can be run as part of CI/CD.

To run tests:

```
yarn test:cucumber
```

### Test Coverage

The tests cover the functionality of the Business Day Checker API. The test coverage includes testing for positive and negative scenarios, and for all endpoints and error conditions.
