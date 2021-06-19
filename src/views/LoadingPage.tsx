import React from 'react'
import { Loader } from '../components/Loader'

interface Props {}

const LoadingPage = (props: Props) => {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader text="Signing You In" />
        </div>
    )
}

export default LoadingPage
