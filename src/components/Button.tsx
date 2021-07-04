import React, { FC, useMemo } from 'react'
import { ThemeColor } from '../types/colors'

type ButtonType = 'primary' | 'secondary' | 'teritary' | 'link' | 'warning'

interface Props {
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit'
    className?: string
    style?: ButtonType
}

export const Button: FC<Props> = ({
    children,
    onClick,
    disabled,
    type = 'button',
    className = '',
    style,
}) => {
    const styleClasses = useMemo(() => {
        switch (style) {
            case 'primary':
                return 'bg-jungle-green hover:opacity-60 focus:ring-jungle-green text-white border border-jungle-green'
            case 'secondary':
                return 'bg-blue-dianne hover:opacity-60 focus:ring-blue-dianne text-white border border-blue-dianne'
            case 'teritary':
                return 'bg-none hover:opacity-60 focus:ring-gray-200 text-black border border-black'
            case 'link':
                return 'bg-white hover:bg-gray-100 focus:ring-jungle-green text-jungle-green'
            case 'warning':
                return 'bg-burnt-sienna hover:opacity-60 focus:ring-burnt-sienna text-white'
            default:
                return 'bg-black hover:bg-opacity-70 focus:ring-gray-700 text-white border border-black'
        }
    }, [style])

    return (
        <button
            className={`rounded px-4 py-2 focus:outline-none focus:ring focus:ring-opacity-30 disabled:opacity-40 ${styleClasses} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}
