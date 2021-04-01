import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>
)
