import { useQuery } from "@tanstack/react-query";
import { Banknote, SquareMenu, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../types/order";

export function Payment() {
  const navigate = useNavigate();

  function openMenu() {
    navigate("/cardapio");
  }

  function openTablePage() {
    navigate("/table/5");
  }

  const { data: orders } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await fetch(`https://localhost:7106/Order`);
      if (!response.ok) throw new Error("Erro ao buscar pedidos");
      const data: IOrder[] = await response.json();
      return data;
    },
  });


  const validOrders = orders?.filter(order => order.products.length > 0);

  const totalAmount = validOrders?.reduce((total, order) => {
    const orderTotal = order.products.reduce((sum, product) => sum + product.price, 0);
    return total + orderTotal;
  }, 0);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Resumo do Pedido</h1>
        {validOrders && validOrders.length > 0 ? (
          <div className="space-y-4">
            {validOrders.map((order, orderIndex) => (
              <div key={orderIndex} className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                <ul className="mt-2 space-y-2">
                  {order.products.map((product, productIndex) => (
                    <li key={productIndex} className="flex justify-between text-neutral-700">
                      <span>{product.name}</span>
                      <span className="font-semibold">
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="text-xl font-semibold text-right mt-4">
              Total:{" "}
              {totalAmount?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">Não há produtos no pedido.</p>
        )}
      </div>

      <footer className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <UsersRound className="w-6 h-6 text-indigo-600" />
          <button
            onClick={openTablePage}
            className="font-semibold text-lg text-neutral-950 hover:text-indigo-600"
          >
            Clientes
          </button>
        </div>

        <div className="flex items-center gap-2">
          <SquareMenu className="w-6 h-6 text-amber-400" />
          <button
            onClick={openMenu}
            className="font-semibold text-lg text-neutral-950 hover:text-amber-400"
          >
            Cardápio
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="w-6 h-6 text-lime-600" />
          <button
            className="font-semibold text-lime-600 text-lg"
            onClick={() => alert("Pagamento realizado com sucesso!")}
          >
            Pagar
          </button>
        </div>
      </footer>
    </div>
  );
}
