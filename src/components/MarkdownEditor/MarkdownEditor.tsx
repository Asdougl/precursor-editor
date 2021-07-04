import React, { useRef, useState } from 'react'
import { Editor, Viewer } from '@toast-ui/react-editor'
import './MarkdownEditor.scss'
import { Button } from '../Button'
import { FaIcon } from '../FaIcon'
import classNames from 'classnames'

interface Props {
    initialValue: string
    onSave: (value: string) => void
    onCancel: () => void
}

export const MarkdownEditor = ({ initialValue, onSave, onCancel }: Props) => {
    const editorRef = useRef<Editor | null>(null)
    const [mode, setMode] = useState<'markdown' | 'wysiwyg'>('markdown')

    const preSave = () => {
        if (editorRef.current) {
            onSave(editorRef.current.getInstance().getMarkdown())
        }
    }

    const switchMode = () => {
        if (editorRef.current) {
            const newMode = mode === 'markdown' ? 'wysiwyg' : 'markdown'
            editorRef.current.getInstance().changeMode(newMode)
            setMode(newMode)
        }
    }

    // Styling
    const bold = () => {
        if (editorRef.current) editorRef.current.getInstance().exec('bold')
    }

    const italic = () => {
        if (editorRef.current) editorRef.current.getInstance().exec('italic')
    }

    const heading = () => {
        if (editorRef.current) editorRef.current.getInstance().exec('heading')
    }

    const blockquote = () => {
        if (editorRef.current)
            editorRef.current.getInstance().exec('blockQuote')
    }

    const listUl = () => {
        if (editorRef.current)
            editorRef.current.getInstance().exec('bulletList')
    }

    const listOl = () => {
        if (editorRef.current)
            editorRef.current.getInstance().exec('orderedList')
    }

    const taskList = () => {
        if (editorRef.current) editorRef.current.getInstance().exec('taskList')
    }

    const code = () => {
        if (editorRef.current) editorRef.current.getInstance().exec('codeBlock')
    }

    // const link = () => {
    //     if (editorRef.current) editorRef.current.getInstance().exec('link')
    // }

    // const image = () => {
    //     if (editorRef.current) editorRef.current.getInstance().exec('image')
    // }

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="border border-gray-200 rounded py-2">
                <div className="flex divide-x divide-gray-200">
                    <div className="px-2 flex">
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={bold}
                        >
                            <FaIcon icon="bold" />
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={italic}
                        >
                            <FaIcon icon="italic" />
                        </button>
                        {/* <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                        onClick={heading}
                    >
                        <FaIcon icon="heading" />
                    </button> */}
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={code}
                        >
                            <FaIcon icon="code" />
                        </button>
                    </div>
                    <div className="px-2 flex gap-2">
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={blockquote}
                        >
                            <FaIcon icon="quote-left" />
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={listUl}
                        >
                            <FaIcon icon="list-ul" />
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={listOl}
                        >
                            <FaIcon icon="list-ol" />
                        </button>
                        <button
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={taskList}
                        >
                            <FaIcon icon="tasks" />
                        </button>
                    </div>
                    {/* <div className="px-2 flex gap-2">
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                        onClick={link}
                    >
                        <FaIcon icon="link" />
                    </button>
                    <button
                        className="px-2 py-1 hover:bg-gray-100 rounded"
                        onClick={image}
                    >
                        <FaIcon icon="image" />
                    </button>
                </div> */}
                </div>
                <div className="flex-grow flex flex-col">
                    <Editor
                        initialValue={initialValue}
                        initialEditType={mode}
                        ref={editorRef}
                        toolbarItems={[]}
                        hideModeSwitch
                        height=""
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button style="primary" onClick={preSave}>
                        Save
                    </Button>
                    <Button style="teritary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
                <div className="flex">
                    <Button style="teritary" onClick={switchMode}>
                        Use {mode === 'markdown' ? 'Classic' : 'Markdown'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface MarkdownPreviewProps {
    value: string
    isPlaceholder?: boolean
    onClick?: () => void
}

export const MarkdownPreview = ({
    value,
    isPlaceholder,
    onClick,
}: MarkdownPreviewProps) => {
    return (
        <div
            className={classNames(
                'h-full flex flex-col px-4 rounded hover:bg-gray-100',
                isPlaceholder ? 'text-gray-400' : 'text-black'
            )}
            onClick={onClick}
        >
            <Viewer initialValue={value} />
        </div>
    )
}
