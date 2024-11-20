import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Banknote, CupSoda, Icon, SquareMenu, UsersRound } from "lucide-react";
import { IProduct } from "../../types/product";
import { IClient } from "../../types/client";
import { IOrder } from "../../types/order";
import { useNavigate, useParams } from "react-router-dom";
import { burger } from "@lucide/lab";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export function ProductDetailsPage() {
  const { productName } = useParams();
  const [selectValue, setSelectValue] = useState("");
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  function BackToMenu() {
    navigate("/cardapio");
  }


  const clientData = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const response = await fetch("https://gerenciamentopedidos-api-buekgfe7dgbtb3e6.brazilsouth-01.azurewebsites.net/Client");
      const client: IClient[] = await response.json();
      return client;
    },
    staleTime: 1000 * 60,
  });

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch(
        `https://gerenciamentopedidos-api-buekgfe7dgbtb3e6.brazilsouth-01.azurewebsites.net/Product/${productName}`
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
        `https://gerenciamentopedidos-api-buekgfe7dgbtb3e6.brazilsouth-01.azurewebsites.net/Order/${selectValue}`
      );
      const orderData: IOrder = await response.json();
      return orderData;
    },
    staleTime: 1000 * 60,
  });

  async function handleOrder() {
    console.log(getOrderRequest.data?.id, selectValue, data?.id);
    if (!getOrderRequest.data?.id || getOrderRequest.data?.id === undefined) {
      toast.error("O Cliente não foi selecionado");
      return;
    }
    const response = await fetch("https://gerenciamentopedidos-api-buekgfe7dgbtb3e6.brazilsouth-01.azurewebsites.net/Order", {
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

    if (response.ok) {
      toast.success("Pedido feito com sucesso!");
    } else {
      toast.error("Ocorreu um erro.");
    }
  }

  useEffect(() => {
    if (selectValue) {
      console.log(selectValue);
      queryClient.invalidateQueries({ queryKey: ["order"] });
    }
  }, [selectValue]);

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex flex-col gap-5 justify-between">
        <div>
          <div className="">
            <img src="/images/comidas.jpg" className="w-full h-96" />
          </div>

          <div className="flex justify-between m-5">
            <div className="px-4 h-16 flex flex-col gap-10 justify-start">
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

            <div className="flex flex-col justify-between">
              <span className="px-5 text-2xl text-neutral-950 font-semibold">
                {data?.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <div className="m-5">
                <select
                  value={selectValue}
                  onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                    setSelectValue(e.target.value);
                  }}
                  name="select"
                  className="py-4 bg-neutral-200 font-semibold rounded-sm"
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

                <Button
                  colors="blue"
                  onClick={() => {
                    handleOrder();
                  }}
                  className="hover:bg-sky-200"
                >
                  Pedir
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <UsersRound className="size-6 text-indigo-600" />
            <button className="font-semibold text-lg text-neutral-950">
              Clientes
            </button>
          </div>

          <div className="flex items-center gap-2">
            <SquareMenu className="size-7 text-amber-400" />
            <button onClick={BackToMenu} className="font-semibold text-lg text-amber-400">
              Cardápio
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Banknote className="size-7 text-lime-600" />
            <button className="font-semibold text-neutral-950 text-lg">
              Pagamento
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
