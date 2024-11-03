import { useQuery } from "@tanstack/react-query";
import { CircleUser, UserPlus2 } from "lucide-react";
import { IClient } from "../../types/client";
import { Button } from "../button";
import { useState } from "react";
import { CreateClientModal } from "../modals/createClientModal";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

export default function ClientsList() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7106/Client");
      const data: IClient[] = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });

  const [isVisible, setIsVisible] = useState(false);

  function showToast(success: boolean) {
    if (success) {
      toast.success("cliente criado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("erro ao adicionar cliente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <>
    <ToastContainer />
      <div>
        <div className="grid place-items-center">
          <div className="space-y-3.5 ">
            <ul className="space-y-3.5 overflow-y-auto max-h-72 px-1 py-3">
              {data ? (
                data.map((i) => {
                  return (
                    <li className="rounded px-2 h-12 bg-neutral-50 shadow-shape flex gap-2 items-center w-52 ">
                      <div>
                        <CircleUser />
                      </div>
                      <span className="font-semibold truncate">{i.name}</span>
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>

            <Button
              size="full"
              onClick={() => {
                setIsVisible(true);
              }}
            >
              <UserPlus2 />
            </Button>
          </div>
        </div>

      </div>
      <CreateClientModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showToast={showToast}
      />
      
    </>
  );
}
