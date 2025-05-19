import request from "supertest";
import app from "../app.js";
import pool from "../database.js";

let processId;
let proceedingId;

beforeAll(async () => {
  await pool.query("DELETE FROM proceedings");
  await pool.query("DELETE FROM processes");

  const res = await request(app).post("/processes").send({
    number: "PROC-TEST-001",
    date: "2025-05-16",
    description: "Processo teste para andamento",
    client: "Cliente X",
    lawyer: "Advogado Y",
    uf: "MG",
  });

  processId = res.body.id;
});

describe("Proceedings API", () => {
  it("should create a proceeding for the process", async () => {
    const res = await request(app).post(`/proceedings/${processId}`).send({
      date: "2025-05-17",
      description: "Primeiro andamento de teste",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Proceeding created successfully");

    // Armazena ID para os próximos testes
    const all = await request(app).get(`/proceedings/${processId}`);
    proceedingId = all.body[0].id;
  });

  it("should list all proceedings for the process", async () => {
    const res = await request(app).get(`/proceedings/${processId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Proceeding updated successfully", async () => {
    const res = await request(app).put(`/proceedings/${proceedingId}`).send({
      date: "2025-05-18",
      description: "Andamento atualizado",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Proceeding updated successfully");
  });

  it("Proceeding deleted successfully", async () => {
    const res = await request(app).delete(`/proceedings/${proceedingId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Proceeding deleted successfully");
  });
});

afterAll(async () => {
  await pool.end();
});
