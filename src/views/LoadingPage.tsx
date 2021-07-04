import React from 'react'
import { FancyLoader } from '../components/FancyLoader'
import { Loader } from '../components/Loader'

interface Props {}

const LoadingPage = (props: Props) => {
    return (
        <div className="flex items-center justify-center h-full">
            <FancyLoader />
        </div>
    )
}

export default LoadingPage
