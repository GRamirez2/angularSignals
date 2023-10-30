import { test, expect } from "@playwright/test";

test.skip("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("has angular title", async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AngularV16/);
});

test("check name of last user", async ({ page }) => {
  await page.goto("/");
  // Expects page to have a heading/h3 with the name of Clementina DuBuque
  await expect(
    page.getByRole("heading", { name: "Clementina DuBuque" })
  ).toBeVisible();
});

test("click last user and check the number of completed tasks", async ({
  page,
}) => {
  await page.goto("/");
  // click the last user
  await page.click("[id='10']");
  // test the number of completed task is what comes from the server, '12'
  await expect(page.getByTestId("_completedTasks")).toHaveText("12");
});

test("click second user, change the state of task to incomplete and check the total complete number", async ({
  page,
}) => {
  await page.goto("/");
  // click the second user
  await page.click("[id='2']");
  // test the number of completed task is what comes from the server, '8'
  await expect(page.getByTestId("_completedTasks")).toHaveText("8");
  // click the slider to make the second task incomplete
  await page.click("[id='mat-mdc-slide-toggle-2-button']");
  // test the number of completed task after one is marked incomplete, should be,'7'
  await expect(page.getByTestId("_completedTasks")).toHaveText("7");
});

const updtatedJson = [
  {
    userId: 5,
    id: 81,
    title: "George Testing",
    completed: true,
  },
  {
    userId: 5,
    id: 82,
    title: "voluptates eum voluptas et dicta",
    completed: false,
  },
  {
    userId: 5,
    id: 83,
    title: "quidem at rerum quis ex aut sit quam",
    completed: true,
  },
  {
    userId: 5,
    id: 84,
    title: "sunt veritatis ut voluptate",
    completed: false,
  },
  {
    userId: 5,
    id: 85,
    title: "et quia ad iste a",
    completed: true,
  },
  {
    userId: 5,
    id: 86,
    title: "incidunt ut saepe autem",
    completed: true,
  },
  {
    userId: 5,
    id: 87,
    title: "laudantium quae eligendi consequatur quia et vero autem",
    completed: true,
  },
  {
    userId: 5,
    id: 88,
    title: "vitae aut excepturi laboriosam sint aliquam et et accusantium",
    completed: false,
  },
  {
    userId: 5,
    id: 89,
    title: "sequi ut omnis et",
    completed: true,
  },
  {
    userId: 5,
    id: 90,
    title: "molestiae nisi accusantium tenetur dolorem et",
    completed: true,
  },
  {
    userId: 5,
    id: 91,
    title: "nulla quis consequatur saepe qui id expedita",
    completed: true,
  },
  {
    userId: 5,
    id: 92,
    title: "in omnis laboriosam",
    completed: true,
  },
  {
    userId: 5,
    id: 93,
    title: "odio iure consequatur molestiae quibusdam necessitatibus quia sint",
    completed: true,
  },
  {
    userId: 5,
    id: 94,
    title: "facilis modi saepe mollitia",
    completed: false,
  },
  {
    userId: 5,
    id: 95,
    title: "vel nihil et molestiae iusto assumenda nemo quo ut",
    completed: true,
  },
  {
    userId: 5,
    id: 96,
    title: "nobis suscipit ducimus enim asperiores voluptas",
    completed: false,
  },
  {
    userId: 5,
    id: 97,
    title: "dolorum laboriosam eos qui iure aliquam",
    completed: false,
  },
  {
    userId: 5,
    id: 98,
    title:
      "debitis accusantium ut quo facilis nihil quis sapiente necessitatibus",
    completed: true,
  },
  {
    userId: 5,
    id: 99,
    title: "neque voluptates ratione",
    completed: false,
  },
  {
    userId: 5,
    id: 100,
    title: "excepturi a et neque qui expedita vel voluptate",
    completed: false,
  },
];

test("click 5th user, change the name of a task and check the json, signal valule, should match the text change", async ({
  page,
}) => {
  await page.goto("/");
  // click the second user
  await page.click("[id='5']");
  // Change the text of the first task in the input field
  await page.getByLabel("Task Name:").nth(0).fill("George Testing");
  // click the update button to mutate the signal
  await page.click("[id='tu_0']");
  // select json inside pre tag and look for updated task name
  await expect(page.getByTestId("_updatedJson")).toContainText(
    "George Testing"
  );
});
