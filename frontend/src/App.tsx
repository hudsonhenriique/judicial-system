import { useState } from "react";
import ProcessList from "./components/ProcessList";
import ProcessForm from "./components/ProcessForm";
import ProceedingsList from "./components/ProceedingsList";
import type { Process } from "./components/types";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);
  const [showProceedings, setShowProceedings] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white py-6 shadow">
        <h1 className="text-3xl font-bold text-center">
          Cadastro de Processos Judiciais
        </h1>
      </header>
      <main className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
        {!showForm && !showProceedings && (
          <>
            <button
              className="mb-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
              onClick={() => {
                setEditingProcess(null);
                setShowForm(true);
              }}
            >
              Adicionar novo processo
            </button>
            <ProcessList
              onEdit={(p) => {
                setEditingProcess(p);
                setShowForm(true);
              }}
              onShowProceedings={(p) => {
                setSelectedProcess(p);
                setShowProceedings(true);
              }}
              key={refresh ? 1 : 0}
            />
          </>
        )}

        {showForm && (
          <ProcessForm
            process={editingProcess ?? undefined}
            onSuccess={() => {
              setShowForm(false);
              setRefresh(!refresh);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showProceedings &&
          selectedProcess &&
          typeof selectedProcess.id === "number" && (
            <ProceedingsList
              processId={selectedProcess.id}
              onClose={() => setShowProceedings(false)}
            />
          )}
      </main>
    </div>
  );
}
