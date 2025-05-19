import { useEffect, useState } from "react";
import type { Process } from "./types";

export default function ProcessList({
  onEdit,
  onShowProceedings,
}: {
  onEdit: (process: Process) => void;
  onShowProceedings: (process: Process) => void;
}) {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar processos
  const fetchProcesses = () => {
    setLoading(true);
    fetch("http://localhost:3001/processes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar processos");
        return res.json();
      })
      .then(setProcesses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  // Função para excluir processo
  async function handleDelete(process: Process) {
    if (window.confirm("Tem certeza que deseja excluir este processo?")) {
      const res = await fetch(`http://localhost:3001/processes/${process.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProcesses();
      } else {
        alert("Erro ao excluir processo.");
      }
    }
  }

  if (loading)
    return (
      <div className="text-center text-blue-700">Carregando processos...</div>
    );
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Processos</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Número</th>
            <th className="p-2">Data</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Advogado</th>
            <th className="p-2">UF</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id} className="border-b">
              <td className="p-2">{process.number}</td>
              <td className="p-2">
                {new Date(process.date).toLocaleDateString()}
              </td>
              <td className="p-2">{process.client}</td>
              <td className="p-2">{process.lawyer}</td>
              <td className="p-2">{process.uf}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onEdit(process)}
                  className="bg-blue-700 text-white hover:bg-blue-800 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(process)}
                  className="bg-red-600 text-white hover:bg-red-700 px-2 py-1 rounded"
                >
                  Excluir
                </button>
                <button
                  onClick={() => onShowProceedings(process)}
                  className="bg-green-700 text-white hover:bg-green-800 px-2 py-1 rounded"
                >
                  Ver Andamentos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
