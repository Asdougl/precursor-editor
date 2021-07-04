import React, { useEffect, useRef, useState } from 'react'
import { TimelineEvent, timelineEventSorter } from '../types/timeline'
import { Button } from '../components/Button'
import ModalWrapper from '../layout/ModalWrapper'
import { Input } from '../components/Input'
import { FaIcon } from './FaIcon'
import { EventEditorRouted } from './EventEditor'
import { firestore } from '../firebase'
import { Tag } from './Tag'
import { Link, Route, useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'

interface Props {
    start: number
    end: number
    allEvents: TimelineEvent[]
    createEvent: (year: number, name: string) => Promise<string>
    updateEvent: (event: TimelineEvent) => void
    deleteEvent: (eventid: string) => void
    routeName: string
}

export const TimelineEditor = ({
    start,
    end,
    allEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    routeName,
}: Props) => {
    const [resolution, setResolution] = useState(2)
    const [topYear, setTopYear] = useState(start)
    const [bottomYear, setBottomYear] = useState(end)
    const [currentEvents, setCurrentEvents] = useState<TimelineEvent[]>([])
    const [focusedEvent, setFocusedEvent] = useState<TimelineEvent | null>(null)
    const [addHeight, setAddHeight] = useState<number | null>(null)
    const [showAll, setShowAll] = useState(false)

    const [sideColumn, setSideColumn] = useState(false)

    const timelineRef = useRef<HTMLDivElement | null>(null)

    const history = useHistory()

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
        const newEventYear = Math.round((addHeight || 0) / resolution)
        createEvent(newEventYear, `New Event`).then((docid) => {
            history.push(`${routeName}/${docid}?new=true`)
        })
    }

    const delEvent = (id: string) => {
        history.push(routeName)
        deleteEvent(id)
    }

    return (
        <div className="border border-black bg-white w-full flex-grow rounded p-4 overflow-hidden grid grid-cols-6 divide-x divide-black">
            {/* Timeline */}
            <div className="flex flex-col divide-y divide-black pr-4 overflow-hidden">
                <div className="px-4 py-2">Year {topYear}</div>
                <div
                    className="flex-grow px-4 overflow-auto"
                    ref={timelineRef}
                    onScroll={scroll}
                    onMouseMove={onMouseMove}
                    onMouseLeave={() => setAddHeight(null)}
                >
                    <div
                        className="bg-black w-1 relative"
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
                                <div className="w-4 h-4 rounded-full bg-black"></div>
                                <div>{evt.year}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-2">Year {bottomYear}</div>
            </div>

            {/* Events */}
            <div
                className={classNames(
                    'pl-4',
                    sideColumn ? 'col-span-3 pr-4' : 'col-span-5'
                )}
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
                        <Link
                            key={evt._id}
                            onMouseOver={() => setFocusedEvent(evt)}
                            onMouseLeave={() => setFocusedEvent(null)}
                            to={`${routeName}/${evt._id}`}
                            className="border border-black px-4 py-3 rounded hover:bg-gray-100 flex gap-2"
                        >
                            <div className="w-10 text-center">{evt.year}</div>
                            <div>{evt.name}</div>
                            {evt.tags && (
                                <div className="flex items-center">
                                    {evt.tags.map((tag, index) => (
                                        <div
                                            key={`${tag}-${index}`}
                                            className="px-2 border border-gray-200 rounded font-mono text-black text-opacity-60"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </ul>
            </div>

            {sideColumn && (
                <div className="col-span-2 pl-4">
                    <h3 className="px-4 py-2 flex justify-between items-center">
                        <div className="font-semibold text-xl">
                            Article Title
                        </div>
                        <Button onClick={() => setSideColumn(false)}>
                            <FaIcon icon="times" />
                        </Button>
                    </h3>
                </div>
            )}

            <Route path={`${routeName}/:eventId`}>
                <EventEditorRouted
                    events={allEvents}
                    onClose={() => history.push(routeName)}
                    onSave={(event) => updateEvent(event)}
                    onDelete={delEvent}
                    maxYear={end}
                    minYear={start}
                />
            </Route>
        </div>
    )
}
