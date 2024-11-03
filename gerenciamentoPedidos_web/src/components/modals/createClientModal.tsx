import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../button";
import { useState } from "react";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (success: boolean) => void;
}

export function CreateClientModal({
  isVisible,
  setIsVisible,
  showToast,
}: Props) {
  const [table, setTable] = useState("");
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  if (!isVisible) {
    return null;
  }

  async function CreateClient() {
    const response = await fetch("https://localhost:7106/Client", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        tableId: table,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    queryClient.invalidateQueries({ queryKey: ["clients"] });

    if (!response.ok) {
      showToast(false);
    } else {
      showToast(true);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-shape p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Adicionar cliente à mesa
        </h3>
        <div className="mb-4">
          <input
            type="name"
            value={name}
            id="campo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={table}
            id="campo2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTable(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Numero da mesa"
          />
        </div>

        <div className="text-center gap-3 flex">
          <Button onClick={CreateClient} colors="blue" size="full">
            Enviar
          </Button>

          <Button
            colors="rose"
            size="full"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
