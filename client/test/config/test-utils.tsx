import React from 'react'
import { createMemoryHistory } from 'history'
import { render as rtlRender } from '@testing-library/react'
import { Router } from 'react-router-dom'

const render = (
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...renderOptions } = {}
) => {
    const Wrapper = ({ children }) => <Router history={history}>{children}</Router>
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
