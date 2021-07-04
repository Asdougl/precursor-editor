import React, { useLayoutEffect, useRef } from 'react'
import anime from 'animejs'

interface Props {}

export const FancyLoader = (props: Props) => {
    const blueRef = useRef<HTMLSpanElement | null>(null)
    const greenRef = useRef<HTMLSpanElement | null>(null)
    const robRef = useRef<HTMLSpanElement | null>(null)
    const sandyRef = useRef<HTMLSpanElement | null>(null)
    const burntRef = useRef<HTMLSpanElement | null>(null)

    const animation = useRef<anime.AnimeInstance | null>(null)

    useLayoutEffect(() => {
        animation.current = anime({
            targets: [
                blueRef.current,
                greenRef.current,
                robRef.current,
                sandyRef.current,
                burntRef.current,
            ],
            keyframes: [
                { translateY: 0 },
                { translateY: -10 },
                { translateY: 10 },
                { translateY: 0 },
            ],
            delay: anime.stagger(100),
            duration: 500,
            loop: true,
            easing: 'easeInOutSine',
        })
    }, [])

    return (
        <div className="flex items-center gap-1 px-4 py-6">
            <span
                ref={blueRef}
                className="h-4 w-4 rounded-full bg-blue-dianne"
            ></span>
            <span
                ref={greenRef}
                className="h-4 w-4 rounded-full bg-jungle-green"
            ></span>
            <span
                ref={robRef}
                className="h-4 w-4 rounded-full bg-rob-roy"
            ></span>
            <span
                ref={sandyRef}
                className="h-4 w-4 rounded-full bg-sandy-brown"
            ></span>
            <span
                ref={burntRef}
                className="h-4 w-4 rounded-full bg-burnt-sienna"
            ></span>
        </div>
    )
}
