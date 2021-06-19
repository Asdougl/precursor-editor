import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import './fontawesome'

let root = document.createElement('div')
root.id = 'root'
document.title = 'Timeline Editor'
document.body.appendChild(root)

let modalRoot = document.createElement('div')
modalRoot.id = 'modal-root'
document.body.appendChild(modalRoot)

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
