import pool from "../database.js";

export async function getAll(req, res) {
  const result = await pool.query("SELECT * FROM processes ORDER BY id DESC");
  res.json(result.rows);
}

export async function getById(req, res) {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM processes WHERE id = $1", [
    id,
  ]);
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Processo não encontrado" });
  res.json(result.rows[0]);
}

export async function create(req, res) {
  const { number, date, description, client, lawyer, uf } = req.body;
  const result = await pool.query(
    "INSERT INTO processes (number, date, description, client, lawyer, uf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [number, date, description, client, lawyer, uf]
  );
  const mensagem =
    uf.toUpperCase() === "MG"
      ? "Processo de MG criado com sucesso"
      : "Processo fora de MG criado com sucesso";
  res.status(201).json({ ...result.rows[0], mensagem });
}

export async function update(req, res) {
  const { id } = req.params;
  const { number, date, description, client, lawyer, uf } = req.body;
  const result = await pool.query(
    "UPDATE processes SET number=$1, date=$2, description=$3, client=$4, lawyer=$5, uf=$6 WHERE id=$7 RETURNING *",
    [number, date, description, client, lawyer, uf, id]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ error: "Processo não encontrado" });
  res.json(result.rows[0]);
}

export async function remove(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM processes WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ error: "Processo não encontrado" });
  res.json({ message: "Processo removido com sucesso" });
}
