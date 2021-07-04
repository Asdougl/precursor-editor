import React, {
    FC,
    FormEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import ModalWrapper from '../layout/ModalWrapper'
import { TimelineEvent } from '../types/timeline'
import { FaIcon } from './FaIcon'
import {
    MarkdownEditor,
    MarkdownPreview,
} from './MarkdownEditor/MarkdownEditor'
import { Button } from './Button'
import classnames from 'classnames'
import { useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface Modifiers {
    shift?: boolean
    ctrl?: boolean
}

interface EventEditorSectionProps {
    label: string
    bordered?: string
}

const EventEditorSection: FC<EventEditorSectionProps> = ({
    children,
    label,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="pl-2 text-xl font-serif">{label}</div>
            <div className="">{children}</div>
        </div>
    )
}

interface Props {
    event: TimelineEvent
    onClose: () => void
    onSave: (event: TimelineEvent) => void
    onDelete: (eventid: string) => void
    maxYear: number
    minYear: number
    newEvent?: boolean
}

type EventAttributeEditor = <T extends keyof TimelineEvent>(
    key: T,
    value: TimelineEvent[T]
) => void

export const EventEditor = ({
    event,
    onClose,
    onSave,
    onDelete,
    maxYear,
    minYear,
    newEvent,
}: Props) => {
    const [eventCopy, setEventCopy] = useState({ ...event })

    const [editingDesc, setEditingDesc] = useState(false)
    const [newTag, setNewTag] = useState<string>('')

    const [newYear, setNewYear] = useState(`${eventCopy.year}`)
    const [invalidYear, setInvalidYear] = useState(isNaN(eventCopy.year))

    const saveTimeout = useRef(-1)
    const [unsaved, setUnsaved] = useState<boolean | null>(null)
    const saveFunction = useRef<() => void>(() => {})

    const eventTitleRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        return () => {
            if (saveTimeout.current !== -1) {
                window.clearTimeout(saveTimeout.current)
                saveFunction.current()
            }
        }
    }, [])

    useLayoutEffect(() => {
        if (newEvent && eventTitleRef.current) {
            eventTitleRef.current.select()
        }
    }, [])

    const editCopy: EventAttributeEditor = (key, value) => {
        setEventCopy((curr) => {
            const next = { ...curr }
            next[key] = value
            saveFunction.current = () => onSave(next)
            return next
        })
        if (saveTimeout.current === -1) {
            setUnsaved(true)

            saveTimeout.current = window.setTimeout(() => {
                console.log('Saving Data...')
                saveFunction.current()
                setUnsaved(false)
                saveTimeout.current = -1
            }, 1000)
        }
    }

    const addTag = (e: FormEvent) => {
        e.preventDefault()
        if (newTag) {
            editCopy('tags', [...(eventCopy.tags || []), newTag])
            setNewTag('')
        }
    }

    const processNewYear = (value: string) => {
        setNewYear(value)
        const asNum = parseInt(value)
        if (!isNaN(asNum) && asNum >= minYear && asNum <= maxYear) {
            editCopy('year', asNum)
            setInvalidYear(false)
        } else {
            setInvalidYear(true)
        }
    }

    const incrementYear = (by: number, modifiers: Modifiers) => {
        let modifiedBy = by
        if (modifiers.ctrl && modifiers.shift) {
            modifiedBy = modifiedBy * 100
        } else if (modifiers.ctrl) {
            modifiedBy = modifiedBy * 50
        } else if (modifiers.shift) {
            modifiedBy = modifiedBy * 10
        }

        const incremented = eventCopy.year + modifiedBy
        if (incremented >= minYear && incremented <= maxYear) {
            editCopy('year', incremented)
            setNewYear(`${incremented}`)
            setInvalidYear(false)
        } else {
            setInvalidYear(true)
        }
    }

    return (
        <ModalWrapper
            height="full"
            width="xl"
            className="flex flex-col px-2 py-3 gap-2"
        >
            <header className="flex justify-between items-center">
                <div className="text-2xl font-serif px-2">Event</div>
                {unsaved !== null && (
                    <div
                        className={classNames(
                            'transition-colors rounded px-4 py-1 flex items-center gap-1',
                            unsaved
                                ? 'bg-rob-roy text-black'
                                : 'bg-jungle-green text-white'
                        )}
                    >
                        <FaIcon
                            icon={unsaved ? 'spinner-third' : 'check'}
                            spin={unsaved}
                        />
                        <span>{unsaved ? 'Saving...' : 'Saved'}</span>
                    </div>
                )}
                <Button onClick={onClose} style="teritary">
                    <FaIcon icon="times" />
                </Button>
            </header>
            <div className="flex-grow flex flex-col gap-6 overflow-auto p-2">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col text-3xl font-serif">
                            <button
                                onClick={(e) =>
                                    incrementYear(-1, {
                                        shift: e.shiftKey,
                                        ctrl: e.ctrlKey,
                                    })
                                }
                                disabled={eventCopy.year >= maxYear}
                                className="focus:outline-none focus:bg-gray-100 focus:text-jungle-green"
                            >
                                <FaIcon icon="chevron-up" />
                            </button>
                            <input
                                type="text"
                                value={newYear}
                                onChange={(e) =>
                                    processNewYear(e.currentTarget.value)
                                }
                                onFocus={(e) => e.currentTarget.select()}
                                className={classnames(
                                    'text-center font-bold w-16 bg-transparent focus:outline-none focus:border-jungle-green focus:bg-gray-100',
                                    { 'text-burnt-sienna': invalidYear }
                                )}
                            />
                            <button
                                onClick={(e) =>
                                    incrementYear(1, {
                                        shift: e.shiftKey,
                                        ctrl: e.ctrlKey,
                                    })
                                }
                                disabled={eventCopy.year <= minYear}
                                className="focus:outline-none focus:bg-gray-100 focus:text-jungle-green"
                            >
                                <FaIcon icon="chevron-down" />
                            </button>
                        </div>
                        <div className="flex-grow relative h-full flex items-center">
                            <input
                                type="text"
                                value={eventCopy.name}
                                onChange={(e) =>
                                    editCopy('name', e.currentTarget.value)
                                }
                                className="w-full text-3xl font-serif px-2 border-b border-black focus:outline-none focus:border-jungle-green focus:bg-gray-100"
                                ref={eventTitleRef}
                            />
                            <div className="absolute bottom-0 left-0 w-full flex items-center gap-2">
                                {eventCopy.tags?.map((tag, index) => (
                                    <div
                                        key={`${tag}-${index}`}
                                        className="px-2 border border-gray-200 rounded font-mono text-black text-opacity-60"
                                    >
                                        {tag}
                                    </div>
                                ))}
                                <form onSubmit={addTag}>
                                    <input
                                        type="text"
                                        className="bg-transparent w-full px-2 focus:outline-none font-mono border-b border-transparent focus:border-black"
                                        value={newTag}
                                        onChange={(e) =>
                                            setNewTag(
                                                e.currentTarget.value.replace(
                                                    ' ',
                                                    ''
                                                )
                                            )
                                        }
                                        placeholder="add tag"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <EventEditorSection label="Description">
                    {editingDesc ? (
                        <MarkdownEditor
                            initialValue={eventCopy.description || ''}
                            onSave={(val) => {
                                editCopy('description', val)
                                setEditingDesc(false)
                            }}
                            onCancel={() => setEditingDesc(false)}
                        />
                    ) : (
                        <MarkdownPreview
                            value={
                                eventCopy.description || '*Describe the Event*'
                            }
                            isPlaceholder={
                                eventCopy.description === undefined ||
                                eventCopy.description === ''
                            }
                            onClick={() => setEditingDesc(true)}
                        />
                    )}
                </EventEditorSection>
                {/* <EventEditorSection label="Linked">
                    [LINKED EVENTS]
                </EventEditorSection>
                <EventEditorSection label="Activity"></EventEditorSection> */}
            </div>
            <footer className="flex justify-end">
                <Button style="warning" onClick={() => onDelete(event._id)}>
                    <FaIcon icon="trash" /> Delete
                </Button>
            </footer>
        </ModalWrapper>
    )
}

interface RoutedProps extends Omit<Props, 'event'> {
    events: TimelineEvent[]
}

export const EventEditorRouted = (props: RoutedProps) => {
    const { eventId } = useParams<{ eventId: string }>()
    const location = useLocation()
    const searchParamMatch = location.search.match(/new=(true|false)/)
    const isNewEvent = searchParamMatch ? searchParamMatch[1] === 'true' : false

    const event = props.events.find((evt) => evt._id === eventId)

    if (!event) return null

    const editorProps: Props = {
        ...props,
        event,
        newEvent: isNewEvent,
    }

    return <EventEditor {...editorProps} />
}
