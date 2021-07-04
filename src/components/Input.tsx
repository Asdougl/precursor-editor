import React, { FC, useRef, useState } from 'react'

interface Props {
    value: string
    onChange: (value: string) => void
    type?: 'text' | 'password'
    className?: string
}

const createId = () => '_' + Math.random().toString(36).substr(2, 7)

export const Input: FC<Props> = ({
    value,
    onChange,
    children,
    type = 'text',
    className = '',
}) => {
    const [displayType, setDisplayType] = useState(type)

    const id = useRef(createId())

    const toggleType = () => {
        if (displayType === 'password') setDisplayType('text')
        else setDisplayType('password')
    }

    return (
        <div className={`flex flex-col px-2 py-4 gap-2 ${className}`}>
            {children && <label htmlFor={id.current}>{children}</label>}
            <div className="border rounded border-black w-full focus-within:ring focus-within:ring-burnt-sienna focus-within:ring-opacity-30 flex">
                <input
                    type={displayType}
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className="flex-grow rounded focus:outline-none px-4 py-2 w-full"
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="px-2 m-1 rounded focus:outline-none focus:bg-burnt-sienna focus:bg-opacity-20"
                        onClick={toggleType}
                    >
                        {displayType === 'password' ? 'SHOW' : 'HIDE'}
                    </button>
                )}
            </div>
        </div>
    )
}
