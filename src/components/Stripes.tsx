import React from 'react'

interface Props {
    className?: string
}

const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']

export const Stripes = ({ className }: Props) => {
    return (
        <div className={`w-10 flex overflow-hidden ${className}`}>
            {colors.map((color) => (
                <div
                    key={color}
                    className="h-full w-1/5"
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    )
}
