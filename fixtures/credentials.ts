import { test as base } from "@playwright/test";

export interface IUserCredentials {
  gbUserLogin: string;
  gbUserPassword: string;
}

export const test = base.extend<IUserCredentials>({
  gbUserLogin: ["gbUserLogin", { option: true }],
  gbUserPassword: ["gbUserPassword", { option: true }],
});
