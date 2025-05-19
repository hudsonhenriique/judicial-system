import { useEffect, useState } from "react";
import type { Proceeding } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ProceedingsList({
  processId,
  onClose,
}: {
  processId: number;
  onClose: () => void;
}) {
  const [proceedings, setProceedings] = useState<Proceeding[]>([]);
  const [form, setForm] = useState({ date: "", description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchProceedings() {
    try {
      const res = await fetch(`${API_URL}/proceedings/${processId}`);
      const data = await res.json();
      setProceedings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar andamentos:", error);
    }
  }

  useEffect(() => {
    fetchProceedings();
    // eslint-disable-next-line
  }, [processId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `${API_URL}/proceedings/${editingId}`
      : `${API_URL}/proceedings/${processId}`;

    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ date: "", description: "" });
      setEditingId(null);
      await fetchProceedings();
    } catch (error) {
      console.error("Erro ao salvar andamento:", error);
    }

    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este andamento?")) {
      try {
        await fetch(`${API_URL}/proceedings/${id}`, { method: "DELETE" });
        await fetchProceedings();
      } catch (error) {
        console.error("Erro ao excluir andamento:", error);
      }
    }
  }

  function handleEdit(proceeding: Proceeding) {
    setForm({
      date: proceeding.date.slice(0, 10),
      description: proceeding.description,
    });
    setEditingId(proceeding.id);
  }

  return (
    <div className="bg-gray-50 p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold text-blue-700 mb-2">Andamentos</h3>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          type="date"
          name="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <textarea
          className="border p-2 rounded"
          name="description"
          placeholder="Descrição do andamento"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          type="submit"
          disabled={loading}
        >
          {editingId ? "Salvar alterações" : "Adicionar andamento"}
        </button>
        {editingId && (
          <button
            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded mt-1"
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ date: "", description: "" });
            }}
          >
            Cancelar edição
          </button>
        )}
      </form>
      <ul>
        {proceedings.map((a) => (
          <li
            key={a.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              <span className="font-semibold">
                {new Date(a.date).toLocaleDateString()}:
              </span>{" "}
              {a.description}
            </span>
            <span>
              <button
                className="text-blue-700 hover:underline mr-2"
                onClick={() => handleEdit(a)}
              >
                Editar
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(a.id)}
              >
                Excluir
              </button>
            </span>
          </li>
        ))}
      </ul>
      <button
        className="mt-2 bg-gray-300 hover:bg-gray-400 py-1 px-3 rounded"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  );
}
