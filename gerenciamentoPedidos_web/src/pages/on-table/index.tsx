import { Icon, UsersRound, SquareMenu, Banknote } from "lucide-react";
import { chairsTablePlatter } from "@lucide/lab";
import ClientsList from "../../components/clientsList";
import { useNavigate } from "react-router-dom";

export function OnTablePage() {
    const navigate = useNavigate()

    function OpenMenu(){
        navigate("/cardapio")
    }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="px-4 h-16 flex">
        <div className="flex items-center gap-4">
          <Icon iconNode={chairsTablePlatter} className="size-10"/>
        </div>
      </div>

      <ClientsList />


      <div className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <UsersRound className="size-6 text-indigo-600" />
          <span className="font-semibold text-lg text-indigo-600">
            Clientes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SquareMenu className="size-7 text-amber-400" />
          <button onClick={OpenMenu} className="font-semibold text-neutral-950 text-lg hover:text-amber-400">
            Cardápio
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="size-7 text-lime-400" />
          <span className="font-semibold text-neutral-950 text-lg hover:text-lime-400">
            Pagamento
          </span>
        </div>
      </div>
    </div>
  );
}
