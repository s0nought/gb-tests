# gb-tests

End-to-end tests for [gamebanana.com](https://gamebanana.com)

Table of Contents:

- [Tests](#tests)
- [Reports](#reports)
- [Stack](#stack)
- [Principles / Patterns](#principles--patterns)
- [Installation](#installation)
- [Scripts](#scripts)

## Tests

- **Authentication**
    - _Log in with username and password_
- **Search**
    - _Find a mod by its title_
    - _Find a mod by its title and properties_
- **Submission**
    - _Download a file attached to the submission_
    - _Edit submission's title_
    - _Add a submission_

## Reports

[Latest Allure Report](https://s0nought.github.io/gb-tests/index.html)

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

Syntax: `npm run <script name>`

|Name|Description|
|:---|:----------|
|`clean`|Clean Allure and Playwright test results|
|`e2e:headless`|Run end-to-end tests in headless mode|
|`e2e:headed`|Run end-to-end tests in headed mode|
|`e2e`|**Run end-to-end tests pipeline**|
|`report:copy-history`|Preserve Allure report "history" subdirectory|
|`report:generate`|Generate Allure report|
|`report:open`|Serve Allure report|
|`report`|**Run Allure report pipeline**|
