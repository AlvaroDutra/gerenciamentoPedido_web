import { useState } from "react"
import { Button } from "./components/button"
import { User, SquareX, LockKeyhole } from 'lucide-react'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  function openLoginModal(){
    setIsLoginModalOpen(true)
  }
  function closeLoginModal(){
    setIsLoginModalOpen(false)
  }
  

  return (
  <div className="h-screen flex items-center justify-center">
    <div className="max-w-3xl w-full px-6 text-center space-y-10">
      <p className="text-neutral-950 text-7xl font-semibold">Boa noite</p>
      <Button onClick={openLoginModal}>
        Iniciar
      </Button>
    </div>
    {isLoginModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-neutral-200 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Confirmar usuario
              </h2>
              <button onClick={closeLoginModal}>
                <SquareX className='text-rose-700 size-5'/>
              </button>
            </div>
            <p className="text-sm font-semibold text-neutral-950">
              Aqui é onde você vai colocar seu nome de usuário e senha para poder acessar a mesa.
            </p>
            <form className="space-y-3">
              <div className='h-14 px-4 bg-neutral-300 border border-neutral-700 rounded-lg flex items-center gap-2'>
                <User className='text-neutral-950 size-5'/>
                  <input 
                  name='user' 
                  placeholder="Nome do usuário" 
                  className="bg-transparent text-lg placeholder-neutral-400 outline-none flex-1" 
                  />
              </div>

              <div className='h-14 px-4 bg-neutral-300 border border-neutral-700 rounded-lg flex items-center gap-2'>
                <LockKeyhole className='text-neutral-950 size-5'/>
                  <input 
                  type="password"
                  name='password' 
                  placeholder="Senha" 
                  className="bg-transparent text-lg placeholder-neutral-400 outline-none flex-1" 
                  />
              </div>

              <Button type="submit" >
                Confirmar usuário
              </Button>

            </form>
          </div>
        </div>
      </div>
    )}
  </div>
)}


export default App
