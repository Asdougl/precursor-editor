import React, { useLayoutEffect, useRef, useState } from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { FaIcon } from '../components/FaIcon'

const MDEditor = () => {
    const [value, setValue] = useState('')
    const editorRef = useRef<Editor | null>(null)

    const save = () => {
        if (editorRef.current) {
            // Set that value!
            setValue(editorRef.current.getInstance().getMarkdown())
        }
    }

    useLayoutEffect(() => {
        if (editorRef.current) {
            const toolbar = editorRef.current
                .getRootElement()
                .querySelector('.toastui-editor-toolbar')

            if (toolbar) {
                toolbar.remove()
            }
        }
    }, [])

    return (
        <div className="w-full max-w-screen-xl mx-auto py-4">
            <h2>Markdown Editor</h2>
            <div>
                <div className="w-full flex">
                    <button>
                        <FaIcon icon="bold" />
                    </button>
                </div>
                <Editor
                    initialValue={value}
                    minHeight="600px"
                    initialEditType="wysiwyg"
                    ref={editorRef}
                    toolbarItems={[]}
                    hideModeSwitch
                />
            </div>
            <button onClick={save}>Save</button>
            <div>
                <h2>OUTPUT:</h2>
                <div>{value}</div>
            </div>
        </div>
    )
}

export default MDEditor
