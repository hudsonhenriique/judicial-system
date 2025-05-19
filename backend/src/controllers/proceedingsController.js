import { query } from "../database.js";

export async function getAllByProcess(req, res) {
  const { processId } = req.params;
  const result = await query(
    "SELECT * FROM proceedings WHERE process_id = $1 ORDER BY date DESC",
    [processId]
  );
  res.json(result.rows);
}

export async function create(req, res) {
  const { processId } = req.params;
  const { date, description } = req.body;
  await query(
    "INSERT INTO proceedings (date, description, process_id) VALUES ($1, $2, $3)",
    [date, description, processId]
  );
  res.status(201).json({ message: "Proceeding created successfully" });
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { date, description } = req.body;
    await query(
      "UPDATE proceedings SET date = $1, description = $2 WHERE id = $3",
      [date, description, id]
    );
    res.json({ message: "Proceeding updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await query("DELETE FROM proceedings WHERE id = $1", [id]);
    res.json({ message: "Proceeding deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
