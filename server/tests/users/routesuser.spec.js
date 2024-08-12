const { app, request, database } = require("../config");

describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    const rows = [];
    jest.spyOn(database, "query").mockImplementation(() => [rows]);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});
