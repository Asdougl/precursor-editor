import React from 'react'

interface Props {
    tag: string | JSX.Element
    onClick?: () => void
}

export const Tag = ({ tag, onClick }: Props) => {
    return (
        <div
            className="text-mono px-2 py-0 rounded bg-white text-black font-mono hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-30"
            onClick={onClick}
        >
            {typeof tag === 'string' ? `#${tag}` : tag}
        </div>
    )
}
