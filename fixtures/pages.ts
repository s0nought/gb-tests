import { test as base } from "@playwright/test";
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

export const test = base.extend<IPages>({
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
});
