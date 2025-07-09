const request = require("supertest");
const app = require("./app");

describe("Express App Tests", () => {
  test("GET / should return HTML", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });

  test("POST /submit should redirect", async () => {
    const res = await request(app).post("/submit").type("form").send({
      name: "John",
      email: "john@example.com",
      message: "Hello!",
    });
    expect(res.statusCode).toBe(302); // Redirect
    expect(res.header.location).toBe("/");
  });
});
