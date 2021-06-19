import React, { useEffect, useRef, useState } from 'react'
import { TimelineEvent, timelineEventSorter } from '../types/timeline'
import { Button } from '../components/Button'
import ModalWrapper from '../layout/ModalWrapper'
import { Input } from '../components/Input'
import { FaIcon } from './FaIcon'
import { EventEditor } from './EventEditor'

interface Props {
    start: number
    end: number
    allEvents: TimelineEvent[]
    createEvent: (year: number, name: string) => void
}

export const TimelineEditor = ({
    start,
    end,
    allEvents,
    createEvent,
}: Props) => {
    const [resolution, setResolution] = useState(2)
    const [topYear, setTopYear] = useState(start)
    const [bottomYear, setBottomYear] = useState(end)
    const [currentEvents, setCurrentEvents] = useState<TimelineEvent[]>([])
    const [focusedEvent, setFocusedEvent] = useState<TimelineEvent | null>(null)
    const [addHeight, setAddHeight] = useState<number | null>(null)
    const [showAll, setShowAll] = useState(false)

    const [newEventName, setNewEventName] = useState('')
    const [newEventYear, setNewEventYear] = useState(0)
    const [creatingNewEvent, setCreatingNewEvent] = useState(false)

    const [sideColumn, setSideColumn] = useState(false)
    const [editEvent, setEditEvent] = useState<TimelineEvent | null>(null)

    const timelineRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        scroll()
    }, [timelineRef.current])

    useEffect(() => {
        const sorted = allEvents.sort(timelineEventSorter)
        setCurrentEvents(
            showAll
                ? sorted
                : sorted.filter(
                      (evt) => evt.year > topYear && evt.year < bottomYear
                  )
        )
    }, [topYear, bottomYear, allEvents, showAll])

    const scroll = () => {
        if (timelineRef.current) {
            const topOffset = timelineRef.current.scrollTop,
                height = timelineRef.current.offsetHeight - 1
            const newTopYear = start + Math.floor(topOffset / resolution)
            const newBottomYear = newTopYear + Math.ceil(height / resolution)
            setTopYear(newTopYear)
            setBottomYear(newBottomYear)
        }
    }

    const onMouseMove = (e: React.MouseEvent) => {
        let height = e.clientY
        if (timelineRef.current) {
            height =
                height -
                timelineRef.current.offsetTop +
                timelineRef.current.scrollTop
        }
        setAddHeight(height)
    }

    const addEvent = () => {
        setNewEventYear(Math.round((addHeight || 0) / resolution))
        setCreatingNewEvent(true)
    }

    const closeNewEvent = () => {
        setCreatingNewEvent(false)
        setNewEventYear(0)
        setNewEventName('')
    }

    const saveNewEvent = (e: React.FormEvent) => {
        e.preventDefault()
        createEvent(newEventYear, newEventName)
        closeNewEvent()
    }

    return (
        <div className="border border-gray-200 w-full flex-grow rounded p-4 overflow-hidden grid grid-cols-6 divide-x">
            {/* Timeline */}
            <div className="flex flex-col divide-y pr-4 overflow-hidden">
                <div className="px-4 py-2">Year {topYear}</div>
                <div
                    className="flex-grow px-4 overflow-auto"
                    ref={timelineRef}
                    onScroll={scroll}
                    onMouseMove={onMouseMove}
                    onMouseLeave={() => setAddHeight(null)}
                >
                    <div
                        className="bg-gray-300 w-1 relative"
                        style={{ height: `${(end - start) * resolution}px` }}
                    >
                        {/* <div className="absolute w-4 h-4 rounded-full bg-burnt-sienna" style={{ top: `${1342 * resolution}px`, left: '33px' }}></div> */}
                        {addHeight && (
                            <div
                                className="absolute border border-blue-dianne rounded left-4 px-2 transform -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-60 whitespace-nowrap"
                                style={{ top: `${addHeight}px` }}
                                onClick={addEvent}
                            >
                                + {Math.round(addHeight / resolution)}
                            </div>
                        )}
                        {allEvents.map((evt) => (
                            <div
                                key={evt._id}
                                className={`absolute left-2 px-2 py-1 rounded flex items-center gap-2 transform -translate-y-1/2 ${
                                    focusedEvent && focusedEvent._id === evt._id
                                        ? 'bg-gray-100'
                                        : ''
                                }`}
                                style={{ top: `${evt.year * resolution}px` }}
                            >
                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                <div>{evt.year}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-2">Year {bottomYear}</div>
            </div>

            {/* Events */}
            <div
                className={`${
                    sideColumn ? 'col-span-3 pr-4' : 'col-span-5'
                } pl-4`}
            >
                <div className="px-4 py-2 flex justify-between">
                    <div className="font-semibold text-xl">
                        {showAll ? 'Current' : 'All'} Events
                    </div>
                    <Button onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'Show Relevant' : 'Show All'}
                    </Button>
                </div>
                <ul className="flex flex-col gap-1">
                    {currentEvents.map((evt) => (
                        <li
                            key={evt._id}
                            onMouseOver={() => setFocusedEvent(evt)}
                            onMouseLeave={() => setFocusedEvent(null)}
                            onClick={() => setEditEvent(evt)}
                            className="border border-gray-200 px-2 py-1 rounded hover:bg-gray-100 flex gap-2"
                        >
                            <div className="w-10 text-right">{evt.year}</div>
                            <div>{evt.name}</div>
                            {evt.tags && (
                                <div className="flex items-center">
                                    {evt.tags.map((tag) => (
                                        <div className="bg-gray-100 px-1 rounded font-mono text-sm text-gray-500">
                                            #{tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {sideColumn && (
                <div className="col-span-2 pl-4">
                    <h3 className="px-4 py-2 flex justify-between items-center">
                        <div className="font-semibold text-xl">
                            Article Title
                        </div>
                        <Button
                            color="white"
                            onClick={() => setSideColumn(false)}
                        >
                            <FaIcon icon="times" />
                        </Button>
                    </h3>
                </div>
            )}

            {creatingNewEvent && (
                <ModalWrapper
                    height="fit"
                    title={`Event in ${newEventYear}`}
                    onClose={closeNewEvent}
                >
                    <form onSubmit={saveNewEvent} className="flex">
                        <Input
                            value={newEventName}
                            onChange={setNewEventName}
                            className="flex-grow py-0"
                        />
                        <div className="py-4">
                            <Button type="submit">
                                <FaIcon icon="check" />
                            </Button>
                        </div>
                    </form>
                </ModalWrapper>
            )}

            {editEvent && (
                <EventEditor
                    event={editEvent}
                    onClose={() => setEditEvent(null)}
                />
            )}
        </div>
    )
}
