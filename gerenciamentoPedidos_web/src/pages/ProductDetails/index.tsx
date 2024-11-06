import { useQuery } from "@tanstack/react-query";
import { Banknote, CupSoda, Icon, SquareMenu, UsersRound } from "lucide-react";
import { IProduct } from "../../types/product";
import { useParams } from "react-router-dom";
import { burger } from "@lucide/lab";

export function ProductDetailsPage() {
  const { productName } = useParams();

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch(
        `https://localhost:7106/Product/${productName}`
      );
      const data: IProduct = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="px-4 h-16 flex">
        <div className="flex items-center gap-4">
          {data?.category.id == 1 ? (
            <CupSoda className="text-cyan-600 size-8"/>
          ) : (
            <Icon iconNode={burger} className="text-amber-700 size-8"/>
          )}
          <h1 className="text-3xl text-neutral-950 font-semibold">
            {data?.name}
          </h1>
        </div>
      </div>

      <div>
        <h2>{data?.price}</h2>
      </div>

      <div className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <UsersRound className="size-6 text-indigo-600" />
          <button className="font-semibold text-lg text-neutral-950 hover:text-indigo-600">
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
