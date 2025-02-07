import { type TestInfo } from "@playwright/test";

/**
 * Parse Allure hierarchy and severity from test annotations
 * @param annotations the list of annotations applicable to the current test
 * @returns `null` on error OR `array` of epic (parentSuite), feature (suite), story (subSuite) and severity strings
 */
export function getAllureHierarchyAndSeverity(
  annotations: TestInfo["annotations"]
): null | string[] {
  const match = annotations.filter((o) => o.type === "allure");

  if (match.length < 1) {
    return null;
  }

  const description = match[0].description;

  if (typeof description !== "string") {
    return null;
  }

  const hierarchyAndSeverity = description.split(";");

  if (hierarchyAndSeverity.length !== 4) {
    return null;
  }

  const [h1, h2, h3, s] = hierarchyAndSeverity;

  return [h1, h2, h3, s];
}
