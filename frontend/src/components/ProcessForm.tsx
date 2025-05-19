import { useState } from "react";
import type { Process } from "./types";
import { toast } from "react-toastify";

const emptyProcess: Process = {
  id: 0,
  number: "",
  date: "",
  description: "",
  client: "",
  lawyer: "",
  uf: "",
};

export default function ProcessForm({
  process,
  onSuccess,
  onCancel,
}: {
  process?: Process;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Process>(process || emptyProcess);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = process ? "PUT" : "POST";
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
    const url = process
      ? `${API_URL}/processes/${process.id}`
      : `${API_URL}/processes`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          data.mensagem || data.message || "Processo salvo com sucesso"
        );
        if (!process) setForm(emptyProcess);
        onSuccess();
      } else {
        toast.error(data.error || data.message || "Erro ao salvar processo");
      }
    } catch {
      toast.error("Erro na conexão com o servidor");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          name="number"
          placeholder="Número"
          value={form.number}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Data"
          required
        />
        <input
          className="border p-2 rounded"
          name="client"
          placeholder="Cliente"
          value={form.client}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="lawyer"
          placeholder="Advogado"
          value={form.lawyer}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="uf"
          placeholder="UF"
          value={form.uf}
          maxLength={2}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        className="border p-2 rounded w-full mt-2"
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        required
      />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          type="submit"
        >
          {process ? "Salvar alterações" : "Cadastrar"}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
