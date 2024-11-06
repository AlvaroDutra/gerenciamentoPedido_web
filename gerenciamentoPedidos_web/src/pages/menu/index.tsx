import { Banknote, BookOpenText, SquareMenu, UsersRound } from "lucide-react";
import { ProductList } from "../../components/productList";
import { useNavigate } from "react-router-dom";

export function OnMenu() {
  const navigate = useNavigate()

  function BackToTable(){
    navigate('/table/5')
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="px-4 h-16 flex">
        <div className="flex items-center gap-4">
          <BookOpenText className="size-10" />
          <h1 className="text-3xl text-neutral-950 font-semibold">Cardápio</h1>
        </div>
      </div>

      <ProductList/>


      <div className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <UsersRound className="size-6 text-indigo-600" />
          <button onClick={BackToTable} className="font-semibold text-lg text-neutral-950 hover:text-indigo-600">
            Clientes
          </button>
        </div>

        <div className="flex items-center gap-2">
          <SquareMenu className="size-7 text-amber-400" />
          <button className="font-semibold text-lg text-amber-400">
            Cardápio
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="size-7 text-lime-600" />
          <button className="font-semibold text-neutral-950 text-lg hover:text-lime-600">
            Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}
