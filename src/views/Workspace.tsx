import React from 'react'
import {
    TimelineEvent,
    Timeline,
    toTimelineEventProto,
} from '../types/timeline'
import { ProtectedViewProps } from '../types/route'
import { Link, useParams } from 'react-router-dom'
import { TimelineEditor } from '../components/TimelineEditor'
import {
    useCollectionData,
    useCollectionDataOnce,
} from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { Button } from '../components/Button'
import { Loader } from '../components/Loader'
import { FaIcon } from '../components/FaIcon'
import { FancyLoader } from '../components/FancyLoader'

const Workspace = ({ user }: ProtectedViewProps) => {
    const { workspaceid } = useParams<{ workspaceid: string }>()

    const eventsRef = firestore
        .collection('workspaces')
        .doc(workspaceid)
        .collection('events')

    const [timelines, timelineLoading, timelineError] =
        useCollectionData<Timeline>(
            firestore
                .collection('workspaces')
                .doc(workspaceid)
                .collection('timelines'),
            { idField: '_id' }
        )
    const [events, eventsLoading, eventsError] =
        useCollectionData<TimelineEvent>(eventsRef, { idField: '_id' })

    const createEvent = async (year: number, name: string) => {
        const doc = await eventsRef.add({ year, name })
        return doc.id
    }

    const updateEvent = (event: TimelineEvent) => {
        eventsRef.doc(event._id).update(toTimelineEventProto(event))
    }

    const deleteEvent = (id: string) => {
        eventsRef.doc(id).delete()
    }

    let view: JSX.Element
    if (timelineLoading || eventsLoading) {
        view = (
            <div className="w-full h-full flex justify-center items-center">
                <FancyLoader />
            </div>
        )
    } else if (timelineError || eventsError) {
        view = <div>{timelineError || eventsError}</div>
    } else if (timelines && timelines.length && events) {
        view = (
            <TimelineEditor
                allEvents={events}
                start={timelines[0].start}
                end={timelines[0].end}
                createEvent={createEvent}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
                routeName={`/editor/${workspaceid}`}
            />
        )
    } else {
        view = <div>Some Unknown Error Occurred</div>
    }

    return (
        <div className="p-4 h-full flex flex-col gap-4 overflow-hidden bg-sandy-brown">
            <div className="px-4 flex justify-between">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    <Link
                        to="/"
                        className="flex items-center justify-center border border-black border-opacity-0 hover:border-opacity-100 hover:bg-white hover:bg-opacity-10 rounded h-10 w-10"
                    >
                        <FaIcon icon="arrow-left" size="sm" />
                    </Link>
                    <div>Timeline Editor</div>
                </h2>
                <Button>Settings</Button>
            </div>
            {view}
        </div>
    )
}

export default Workspace
