import React from 'react'
import { FaIcon } from './FaIcon'

interface Props {
    text?: string
}

export const Loader = ({ text }: Props) => {
    return (
        <div className="w-8 h-8 flex items-center justify-center gap-2">
            <FaIcon icon="spinner-third" spin />
            {text && <div className="whitespace-nowrap">{text}</div>}
        </div>
    )
}
