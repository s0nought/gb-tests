import { test } from "@fixtures";
import { playwrightAuthStateFile } from "@constants";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Authentication", () => {
      test.beforeEach(async () => {
        await allure.epic("UI");
        await allure.feature("Core");
        await allure.story("Authentication");
      });

      test(
        "Log in with username and password",
        {
          tag: ["@cjm"],
        },
        async ({ request, gbUserLogin, gbUserPassword }) => {
          await request.post("https://gamebanana.com/apiv11/Member/Authenticate", {
            data: {
              "_sUsername": gbUserLogin,
              "_sPassword": gbUserPassword,
            },
          });

          await request.storageState({ path: playwrightAuthStateFile });
        }
      );
    });
  });
});
