import React, { FC } from 'react'
import { ThemeColor } from '../types/colors'

interface Props {
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit'
    className?: string
    color?: ThemeColor | 'white' | 'link'
}

const colorClassNames = (color: ThemeColor | 'white' | 'link') => {
    switch (color) {
        case 'blue-dianne':
            return 'bg-blue-dianne focus:ring-blue-dianne text-white'
        case 'burnt-sienna':
            return 'bg-burnt-sienna focus:ring-burnt-sienna text-white'
        case 'jungle-green':
            return 'bg-jungle-green focus:ring-jungle-green text-white'
        case 'rob-roy':
            return 'bg-rob-roy focus:ring-rob-roy text-white'
        case 'sandy-brown':
            return 'bg-sandy-brown focus:ring-sandy-brown text-white'
        case 'link':
            return 'bg-white focus:ring-jungle-green text-jungle-green'
        default:
            return 'bg-white focus:ring-gray-200 text-black border border-gray-300'
    }
}

export const Button: FC<Props> = ({
    children,
    onClick,
    disabled,
    type = 'button',
    className = '',
    color = 'jungle-green',
}) => {
    return (
        <button
            className={`rounded px-4 py-2 focus:outline-none focus:ring focus:ring-opacity-30 disabled:opacity-40 ${colorClassNames(
                color
            )} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}
