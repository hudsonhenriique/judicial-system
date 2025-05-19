import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ProceedingForm({
  processId,
  onSuccess,
  proceeding,
}: {
  processId: number;
  onSuccess: () => void;
  proceeding?: { id: number; date: string; description: string };
}) {
  const [form, setForm] = useState({
    date: proceeding?.date || "",
    description: proceeding?.description || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = proceeding ? "PUT" : "POST";
    const url = proceeding
      ? `${API_URL}/proceedings/${proceeding.id}`
      : `${API_URL}/proceedings/${processId}`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar andamento:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        className="border p-2 rounded w-full mb-2"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <textarea
        className="border p-2 rounded w-full mb-2"
        name="description"
        placeholder="Descrição do andamento"
        value={form.description}
        onChange={handleChange}
        required
      />
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
        type="submit"
      >
        {proceeding ? "Salvar alterações" : "Adicionar andamento"}
      </button>
    </form>
  );
}
