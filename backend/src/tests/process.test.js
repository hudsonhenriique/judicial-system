import request from "supertest";
import app from "../app.js";
import pool from "../database.js";

let createdProcessId;

beforeAll(async () => {
  await pool.query("DELETE FROM proceedings");
  await pool.query("DELETE FROM processes");
});

describe("Processes API", () => {
  it("should create a MG process and return the correct message", async () => {
    const res = await request(app).post("/processes").send({
      number: "TEST-001",
      date: "2025-05-16",
      description: "Processo teste de MG",
      client: "Cliente Teste",
      lawyer: "Advogado Teste",
      uf: "MG",
    });

    expect(res.status).toBe(201);
    expect(res.body.mensagem).toBe("Processo de MG criado com sucesso");

    createdProcessId = res.body.id;
  });

  it("should return all processes", async () => {
    const res = await request(app).get("/processes");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update the process", async () => {
    const res = await request(app).put(`/processes/${createdProcessId}`).send({
      number: "TEST-002",
      date: "2025-05-17",
      description: "Processo atualizado",
      client: "Cliente Atualizado",
      lawyer: "Advogado Atualizado",
      uf: "SP",
    });

    expect(res.status).toBe(200);
    expect(res.body.uf).toBe("SP");
  });

  it("should delete the process", async () => {
    const res = await request(app).delete(`/processes/${createdProcessId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Processo removido com sucesso");
  });
});

afterAll(async () => {
  await pool.end();
});
