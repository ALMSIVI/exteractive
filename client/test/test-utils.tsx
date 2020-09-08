// test-utils.js
import React from 'react'
import { createMemoryHistory } from 'history'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import { Router } from 'react-router-dom'

const render = (
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...renderOptions } = {}
) => {
    const Wrapper = ({ children }) => (
        <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>
    )
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render, store }
