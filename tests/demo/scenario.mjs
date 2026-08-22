export default async (a, b) => {
  await a.getByLabel("Timer label").fill("Team warm-up");
  await a.getByLabel("Seconds").fill("75");
  await a.getByRole("button", { name: "Add timer" }).click();
  await a.waitForTimeout(900);
  await a.getByRole("button", { name: "Start" }).click();
  await b.waitForTimeout(2500);
  await a.getByRole("button", { name: "Pause" }).click();
  await a.waitForTimeout(1200);
};
