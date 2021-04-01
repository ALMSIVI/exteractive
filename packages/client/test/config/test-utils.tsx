import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const render = (ui: JSX.Element, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
    return {
        ...rtlRender(ui, { wrapper: BrowserRouter }),
    }
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
