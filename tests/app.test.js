const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

beforeAll(async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase().catch(() => {});
  await mongoose.connection.close();
});

test("GET / returns hello", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.text).toMatch(/Hello from Node\.js API/);
});

test("POST /notes creates a note", async () => {
  const res = await request(app).post("/notes").send({ text: "ci/cd demo" });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("_id");
  expect(res.body.text).toBe("ci/cd demo");
});
