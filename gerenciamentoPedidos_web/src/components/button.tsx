import { ComponentProps, ReactNode } from 'react'
import{tv, VariantProps} from 'tailwind-variants'

const buttonVariants = tv({
    base: 'rounded-lg px-10 font-semibold text-2xl items-center gap-2 justify-center ',

    variants:{
        colors: {
            rose: 'bg-rose-900 text-rose-50 hover:bg-rose-800',
            amber: 'bg-amber-400 text-slate-50 hover:bg-amber-300'
        },
        size: {
            default: 'py-3',
            full:'w-full h-11'
        },
    },

    defaultVariants: {
        colors:'rose',
        size:'default'
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
}

export function Button({children, colors, size,...props }: ButtonProps){
    return(
        <button {...props} className={buttonVariants({colors, size})}>
            {children}
        </button>
    )
}