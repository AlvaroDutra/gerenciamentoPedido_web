import { useQuery } from "@tanstack/react-query";
import { Button } from "../button";
import { IProduct } from "../../types/product";

interface Props {
  isProductDetailsModalOpen: boolean;
  setIsProductDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productName: string
}

export function ProductDetailsModal({
  isProductDetailsModalOpen,
  setIsProductDetailsModalOpen,
  productName
}: Props) {
  if (!isProductDetailsModalOpen) {
    return null;
  }

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch(`https://localhost:7106/Product/${productName}`);
      const data: IProduct = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-neutral-50 rounded-lg shadow-shape p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{data?.name}</h2>
        <p>R${data?.price}</p>
        <div className="mt-4">
        <div className="text-center gap-3 flex">
          <Button colors="blue" size="full">
            Pedir
          </Button>

          <Button
            colors="rose"
            size="full"
            onClick={() => {
              setIsProductDetailsModalOpen(false);
            }}
          >
            Cancelar
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
