import { Banknote, SquareMenu, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Payment() {
  const navigate = useNavigate();

  function OpenMenu() {
    navigate("/cardapio");
  }

  function OpenTablePage() {
    navigate("/table/5");
  }

  return (
    <div>
      <footer className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <UsersRound className="size-6 text-indigo-600" />
          <button onClick={OpenTablePage} className="font-semibold text-lg text-neutral-950 hover:text-indigo-600">
            Clientes
          </button>
        </div>

        <div className="flex items-center gap-2">
          <SquareMenu className="size-7 text-amber-400" />
          <button onClick={OpenMenu} className="font-semibold text-lg text-neutral-950 hover:text-amber-400">
            Cardápio
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="size-7 text-lime-600" />
          <button className="font-semibold text-lime-600">
            Pagamento
          </button>
        </div>
      </footer>
    </div>
  );
}
