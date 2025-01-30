import { test as base } from "@playwright/test";

export interface IAuthState {
  gbAuthStateFile: string;
}

export const test = base.extend<IAuthState>({
  gbAuthStateFile: ["gbAuthStateFile", { option: true }],
});
