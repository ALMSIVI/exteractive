import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { Provider } from 'react-redux'
import store from './app/store'
import { fetchUsers } from './features/users/usersSlice'
import { CssBaseline } from '@material-ui/core'

store.dispatch(fetchUsers())

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('container')
)
