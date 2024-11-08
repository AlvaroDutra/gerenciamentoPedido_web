import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../../types/product";
import { CupSoda, Icon } from "lucide-react";
import { burger } from "@lucide/lab";
import { useNavigate } from "react-router-dom";

export function ProductList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7106/Product");
      const data: IProduct[] = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });
  
  async function OpenProductDetailsPage(productName: string){

    await queryClient.invalidateQueries({queryKey: ["product"]})

    navigate(`/cardapio/${productName}`)
  }


  return (
    <div className="mx-5">
      <ul className="flex gap-5 flex-wrap">
        {data ? (
          data.map((i) => {
            return (
              <li
                key={i.id}
                className="rounded px-2 h-14 bg-neutral-50 shadow-shape flex gap-2 items-center w-52 "
              >
                {i.category.id == 1 ?<CupSoda className="text-cyan-600"/> : <Icon iconNode={burger} className="text-amber-700"/>}
                <button
                  onClick={() => {OpenProductDetailsPage(i.name)}}
                  className="font-semibold truncate hover:text-stone-500"
                >
                  {i.name}
                </button>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
