import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import storiesReducer from '../features/stories/storiesSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

const store = configureStore({
    reducer: {
        stories: storiesReducer,
        users: usersReducer,
        notifications: notificationsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export default store
