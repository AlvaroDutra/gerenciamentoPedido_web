import { Icon, CircleUser, UserPlus2, UsersRound, SquareMenu, Banknote} from 'lucide-react'
import { chairsTablePlatter } from '@lucide/lab'

export function OnTablePage(){
    return(
        <div className='h-screen'>
            <div className="px-4 h-16 flex">
                <div className="flex items-center gap-4">
                    <Icon iconNode={chairsTablePlatter} />
                    <span className="font-semibold text-2xl text-neutral-950">Mesa 5</span>
                </div>
            </div>

            <div className='grid place-items-center h-screen '>
                <div className='space-y-3.5'>
                    <div className='rounded px-4 h-12 bg-neutral-50 shadow-shape flex items-center justify gap-5'>
                        <CircleUser/>
                        <span className='font-semibold'>Álvaro</span>
                    </div>
                    <div className='rounded px-4 h-12 bg-neutral-50 shadow-shape flex items-center justify gap-5'>
                        <CircleUser/>
                        <span className='font-semibold'>fabricio</span>
                    </div>
                    <div className='rounded px-4 h-12 bg-neutral-50 shadow-shape flex items-center justify-center gap-5'>
                        <UserPlus2 className='hover:text-emerald-400'/>
                    </div>
                </div>
            </div>

            <div className="px-4 h-24 bg-neutral-100 shadow-shape flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                    <UsersRound className="size-6 text-indigo-600"/>
                    <span className='font-semibold text-neutral-950 text-lg hover:text-indigo-600'>Clientes</span>
                </div>

                <div className="flex items-center gap-2">
                    <SquareMenu className="size-6 text-amber-400"/>
                    <span className='font-semibold text-neutral-950 text-lg hover:text-amber-400'>Cardápio</span>
                </div>

                <div className="flex items-center gap-2">
                    <Banknote className="size-6 text-lime-400"/>
                    <span className='font-semibold text-neutral-950 text-lg hover:text-lime-400'>Pagamento</span>
                </div>

            </div>
        </div>
    )
}