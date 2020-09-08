import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const notificationsAdapter = createEntityAdapter({ sortComparer: (a, b) => b.date.localeCompare(a.date) })

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
    //const allNotifications = selectAllNotifications(getState())
    //const [latestNotification] = allNotifications
    //const latestTimeStamp = latestNotification ? latestNotification.date : ''
    await new Promise(resolve => setTimeout(resolve, 2000))
    return []
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            Object.values(state.entities).forEach(notification => {
                notification.read = true
            })
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
            notificationsAdapter.upsertMany(state, action.payload)
        })
    },
})

export const { allNotificationsRead } = notificationsSlice.actions
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(
    (state: RootState) => state.notifications
)
export default notificationsSlice.reducer
