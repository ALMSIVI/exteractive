import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { User } from '../../types/users.types'
import { RootState } from '../../app/store'

const usersAdapter = createEntityAdapter({ selectId: (user: User) => user._id })
const initialState = usersAdapter.getInitialState()

// TODO: implement user functionality
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return [
        { _id: '0', name: 'Exteractive Official' },
        { _id: '1', name: 'Exteractive Community Team' },
        { _id: '2', name: 'Exteractive Admins' },
    ]
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
    (state: RootState) => state.users
)
export default usersSlice.reducer
