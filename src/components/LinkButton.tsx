import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string
    className?: string
}

export const LinkButton: FC<Props> = ({ children, to, className = '' }) => {
    return (
        <Link
            to={to}
            className={`block text-center rounded text-jungle-green hover:opacity-40 px-4 py-2 focus:ring focus:ring-jungle-green focus:ring-opacity-40 ${className}`}
        >
            {children}
        </Link>
    )
}
