import { ComponentProps, ReactNode } from 'react'
import{tv, VariantProps} from 'tailwind-variants'

const buttonVariants = tv({
    base: 'rounded-lg shadow-shape px-5 font-semibold text-2xl items-center gap-2 justify-items-center',

    variants:{
        colors: {
            blue: 'bg-sky-900 text-sky-50 hover:bg-sky-800',
            rose: 'bg-red-600 text-slate-50 hover:bg-red-800'
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