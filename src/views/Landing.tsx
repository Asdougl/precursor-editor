import React from 'react'
import { Stripes } from '../components/Stripes'

const Landing = () => {
    return (
        <div>
            <div className="bg-gray-500 flex items-center justify-center h-96">
                <div className="font-bold text-white text-8xl flex gap-8 font-serif">
                    <Stripes className="rounded-full w-24" />
                    Precursor
                </div>
            </div>
            <div className="container mx-auto rounded">ABOUT</div>
        </div>
    )
}

export default Landing
