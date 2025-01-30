import { type IUserCredentials, test as credentialsTest } from "./credentials";
import { type IAuthState, test as authStateTest } from "./state";
import { test as pagesTest } from "./pages";
import { expect, mergeTests } from "@playwright/test";

const test = mergeTests(authStateTest, credentialsTest, pagesTest);

export { expect, test, type IAuthState, type IUserCredentials };
