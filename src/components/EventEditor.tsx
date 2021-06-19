import React, { useEffect, useState } from 'react'
import ModalWrapper from '../layout/ModalWrapper'
import { TimelineEvent } from '../types/timeline'

interface Props {
    event: TimelineEvent
    onClose: () => void
}

export const EventEditor = ({ event, onClose }: Props) => {
    const [eventCopy, setEventCopy] = useState(event)

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <ModalWrapper
            height="full"
            onClose={onClose}
            title={
                <input
                    type="text"
                    value={eventCopy.name}
                    onChange={(e) =>
                        setEventCopy((curr) => ({
                            ...curr,
                            name: e.currentTarget.value,
                        }))
                    }
                />
            }
            width="lg"
        >
            <form onSubmit={submit}></form>
        </ModalWrapper>
    )
}
