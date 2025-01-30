# gb-tests

End-to-end tests for [gamebanana.com](https://gamebanana.com)

Table of Contents:

- [Tests](#tests)
- [Stack](#stack)
- [Principles / Patterns](#principles--patterns)
- [Installation](#installation)
- [Scripts](#scripts)

## Tests

- **Authentication**
    - _Authentication_  
        Authenticate with login and password from the login page.
- **Search**
    - _Simple_  
        Perform a basic search for a submission from the header.
    - _Advanced_  
        Perform an advanced search for a submission from the search page.
- **Submission**
    - _Download_  
        Download a file attached to a submission.
    - _Edit_  
        Edit submission's properties.
    - _Add_  
        Add a submission for a game.

## Stack

- Allure
- Node.js
- TypeScript
- Playwright Test

## Principles / Patterns

This project respects the following principles and patterns:

- DRY (as long as it doesn't fall into YAGNI)
- POMs + Fixtures
- Test CJM

## Installation

Install prerequisites:

1. [Git](https://git-scm.com/downloads)
1. [Node.js](https://nodejs.org/en/download)
1. [Allure Report for Node.js](https://allurereport.org/docs/install-for-nodejs/)

To download browser binaries and their dependencies run `npx playwright install --with-deps`

Run in terminal:

```bash
$ git clone https://github.com/s0nought/gb-tests.git
$ cd gb-tests
$ npm install
$ cp .env.sample .env
```

Make sure to specify `GB_USER_LOGIN` and `GB_USER_PASSWORD` in `.env`

N.B.: you might need to login in the UI first when you run tests from a new device.

## Scripts

|Name|Description|
|:---|:----------|
|`npm run clean`|Clean Allure and Playwright test results|
|`npm run e2e`|Run end-to-end tests|
|`npm run e2e:headed`|Run end-to-end tests in headed mode|
|`npm run report`|Generate Allure report|