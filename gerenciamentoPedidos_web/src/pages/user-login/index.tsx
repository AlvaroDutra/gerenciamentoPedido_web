
import { Button } from "../../components/button"
import { useNavigate } from "react-router-dom"

export function UserLoginPage() {
    const navigate = useNavigate()
    
    function confirUser(){
        
        navigate('/table/5')
    }

    return (
    <div className="h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
        
        <p className="text-neutral-950 text-7xl font-semibold">Seja bem-vindo</p>

        <Button onClick={confirUser} className="shadow-shape" colors="amber">
            Iniciar
        </Button>

        </div>
    </div>
)}



