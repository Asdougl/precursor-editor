import React, { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaIcon } from '../components/FaIcon'

type WrapperSize = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
    title?: string | JSX.Element
    height?: 'full' | 'fit'
    onClose?: () => void
    width?: WrapperSize
    onSubmit?: () => void
    className?: string
    escHotkey?: boolean
}

const getWrapperSize = (size: WrapperSize) => {
    switch (size) {
        case 'sm':
            return 'max-w-screen-sm'
        case 'md':
            return 'max-w-screen-md'
        case 'lg':
            return 'max-w-screen-lg'
        case 'xl':
            return 'max-w-screen-xl'
        default:
            return 'max-w-screen-md'
    }
}

const ModalWrapper: FC<Props> = ({
    children,
    title,
    height,
    onClose,
    width = 'md',
    className = '',
    escHotkey,
}) => {
    useEffect(() => {
        const onKeyup = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && escHotkey) {
                onClose?.()
            }
        }

        document.body.addEventListener('keyup', onKeyup)

        return () => {
            document.body.removeEventListener('keyup', onKeyup)
        }
    }, [escHotkey, onClose])

    return createPortal(
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center z-20 p-8">
            <div
                className={`bg-white w-full ${getWrapperSize(
                    width
                )} rounded-lg border border-black shadow-lg px-2 flex flex-col ${
                    height === 'fit' ? 'my-auto' : ''
                }`}
            >
                {(title || onClose) && (
                    <h3 className="font-semibold text-lg flex items-center justify-between border-b border-gray-200 py-2 px-2">
                        <div>{title}</div>
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-full hover:bg-gray-100 focus:bg-gray-200 w-8 h-8 focus:outline-none focus:ring focus:ring-gray-300 flex items-center justify-center"
                        >
                            <FaIcon icon="times" />
                        </button>
                    </h3>
                )}
                <div className={`flex-grow py-2 overflow-auto ${className}`}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') || document.createElement('div')
    )
}

export default ModalWrapper
