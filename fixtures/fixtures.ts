import { expect, test as base } from "@playwright/test";
import {
  AddPage,
  GamePage,
  HomePage,
  LoginPage,
  SearchPage,
  SubmissionAddPage,
  SubmissionEditPage,
  SubmissionViewPage,
} from "@pages";

interface IUserCredentials {
  gbUserLogin: string;
  gbUserPassword: string;
}

interface IPages {
  addPage: AddPage;
  gamePage: GamePage;
  homePage: HomePage;
  loginPage: LoginPage;
  searchPage: SearchPage;
  submissionAddPage: SubmissionAddPage;
  submissionEditPage: SubmissionEditPage;
  submissionViewPage: SubmissionViewPage;
}

const domainWhitelist = [
  "gamebanana.com",
  "webfiles.gamebanana.com",
  "images.gamebanana.com",
  "optimg.gamebanana.com",
  "fonts.googleapis.com",
  "ajax.googleapis.com",
];

const test = base.extend<IUserCredentials & IPages>({
  gbUserLogin: ["gbUserLogin", { option: true }],
  gbUserPassword: ["gbUserPassword", { option: true }],

  addPage: async ({ page }, use) => {
    await use(new AddPage(page));
  },

  gamePage: async ({ page }, use) => {
    await use(new GamePage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  submissionAddPage: async ({ page }, use) => {
    await use(new SubmissionAddPage(page));
  },

  submissionEditPage: async ({ page }, use) => {
    await use(new SubmissionEditPage(page));
  },

  submissionViewPage: async ({ page }, use) => {
    await use(new SubmissionViewPage(page));
  },

  page: async ({ page }, use) => {
    await page.route("**", async (route) => {
      const url = new URL(route.request().url());
      const domain = url.hostname;

      if (domainWhitelist.includes(domain)) {
        await route.continue();
      } else {
        await route.abort("blockedbyclient");
      }
    });
    await use(page);
  },
});

export { expect, test, type IUserCredentials };
