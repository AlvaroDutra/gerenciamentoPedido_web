import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Banknote, CupSoda, Icon, SquareMenu, UsersRound } from "lucide-react";
import { IProduct } from "../../types/product";
import { IClient } from "../../types/client";
import { IOrder } from "../../types/order";
import { useParams } from "react-router-dom";
import { burger } from "@lucide/lab";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

export function ProductDetailsPage() {
  const { productName } = useParams();
  const [selectValue, setSelectValue] = useState("");
  const queryClient = useQueryClient();

  const clientData = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7106/Client");
      const client: IClient[] = await response.json();
      return client;
    },
    staleTime: 1000 * 60,
  });

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

  const getOrderRequest = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await fetch(
        `https://localhost:7106/order/${selectValue}`
      );
      const orderData: IOrder = await response.json();
      return orderData;
    },
    staleTime: 1000 * 60,
  });

  async function handleOrder() {
    console.log(getOrderRequest.data?.id, selectValue, data?.id);
    if(!getOrderRequest.data?.id || getOrderRequest.data?.id === undefined){
      console.log("O ALVARO EH GAY")
      toast.error("O Cliente não foi selecionado")
    }
    const response = await fetch("https://localhost:7106/Order", {
      method: "POST",
      body: JSON.stringify({
        id: getOrderRequest.data?.id,
        clientId: selectValue,
        productId: data?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    if (selectValue) {
      console.log(selectValue)
      queryClient.invalidateQueries({ queryKey: ["order"] });
    }
  }, [selectValue]);  

  return (
    <>
    <ToastContainer />
    <div className="h-screen flex flex-col justify-between">
      <div>
        <p>aqui vai ta uma imagem</p>
      </div>
      <div className="px-4 h-16 flex">
        <div className="flex items-center gap-4">
          {data?.category.id == 1 ? (
            <CupSoda className="text-cyan-600 size-8" />
          ) : (
            <Icon iconNode={burger} className="text-amber-700 size-8" />
          )}
          <h1 className="text-3xl text-neutral-950 font-semibold">
            {data?.name}
          </h1>
        </div>
      </div>

      <div>
        <p>aqui vai uma breve descricao do produto</p>
      </div>

      <div className="flex flex-col">
        <span className="px-5 text-2xl text-neutral-950 font-semibold">
          {data?.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <div>
          <Button
            colors="blue"
            onClick={() => {
              handleOrder();
            }}
            className="hover:bg-sky-200"
          >
            Pedir
          </Button>
          <select
            value={selectValue}
            onChange={async(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectValue(e.target.value);
            }}
            name="select"
            >
            <option value={""}>Selecione um usuario</option>
            {clientData.data?.map((i) => {
              return (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>
        </div>
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
            </>
  );
}
