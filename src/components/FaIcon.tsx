import { IconName, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    icon: IconName
    size?: SizeProp
    spin?: boolean
    className?: string
}

export const FaIcon = ({ icon, size, spin, className }: Props) => {
    return (
        <FontAwesomeIcon
            icon={['fal', icon]}
            fixedWidth
            size={size}
            spin={spin}
            className={className}
        />
    )
}
