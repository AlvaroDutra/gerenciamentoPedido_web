import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../types/product";
import { CupSoda, Icon } from "lucide-react";
import { burger } from "@lucide/lab";
import { useState } from "react";
import { ProductDetailsModal } from "../modals/productDatailModal";

export function ProductList() {
    const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false)
    const [productName, setProductName] = useState('')
    function OpenProductDetailsModal(name: string){
        setProductName(name)
        setIsProductDetailsModalOpen(true)
    }


  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7106/Product");
      const data: IProduct[] = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });

  return (
    <div className="mx-5">
      <ul className="flex gap-5 flex-wrap">
        {data ? (
          data.map((i) => {
            return (
              <li
                key={i.id}
                className="rounded px-2 h-12 bg-neutral-50 shadow-shape flex gap-2 items-center w-52 "
              >
                {i.category.id == 1 ?<CupSoda/> : <Icon iconNode={burger}/>}
                <button
                  onClick={()=> {OpenProductDetailsModal(i.name)}}
                  className="font-semibold truncate"
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
    <ProductDetailsModal
        isProductDetailsModalOpen={isProductDetailsModalOpen}
        setIsProductDetailsModalOpen={setIsProductDetailsModalOpen}
        productName={productName}
        />

    </div>
  );
}
