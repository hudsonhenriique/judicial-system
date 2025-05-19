import pool from "./database.js";

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexão bem-sucedida! Data/hora do banco:", res.rows[0].now);
  } catch (err) {
    console.error("Erro ao conectar no banco:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
