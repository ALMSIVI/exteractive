import axios from 'axios'
import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { Story, Reaction } from '../../types/stories.types'
import { LoadingStatus } from '../../types/statuses.types'
import { RootState } from '../../app/store'

const storiesAdapter = createEntityAdapter({ selectId: (story: Story) => story._id })
const initialState = storiesAdapter.getInitialState({ status: LoadingStatus.idle, error: '' })

export const fetchStories = createAsyncThunk('stories/fetchStories', async () => {
    const response = await axios.get('/api/stories/recent')
    return response.data
})

// TODO: implement add story feature
export const addStory = createAsyncThunk('stories/addStory', async (initialStory: Story) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return initialStory
})

type StoryAction = { payload: Story }
type ReactionAction = { payload: { storyId: string; reaction: Reaction } }

const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        storyUpdated(state, action: StoryAction) {
            const { _id, title, text } = action.payload
            const existingStory = state.entities[_id]
            if (existingStory) {
                existingStory.title = title
                existingStory.text = text
                existingStory.date = new Date().toISOString() // ? Add a "modified date" field?
            }
        },
        reactionAdded(state, action: ReactionAction) {
            const { storyId, reaction } = action.payload
            const existingStory = state.entities[storyId]
            if (existingStory) {
                if (!existingStory.reactions) {
                    existingStory.reactions = {}
                }
                if (!existingStory.reactions[reaction]) {
                    existingStory.reactions[reaction] = 0
                }
                existingStory.reactions[reaction]++
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchStories.pending, (state, _) => {
            state.status = LoadingStatus.loading
        })
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.status = LoadingStatus.succeeded
            storiesAdapter.upsertMany(state, action.payload)
        })
        builder.addCase(fetchStories.rejected, (state, action) => {
            state.status = LoadingStatus.failed
            state.error = action.error.message
        })
        builder.addCase(addStory.fulfilled, storiesAdapter.addOne)
    },
})

export const { storyUpdated, reactionAdded } = storiesSlice.actions
export const {
    selectAll: selectAllStories,
    selectById: selectStoryById,
    selectIds: selectStoryIds,
} = storiesAdapter.getSelectors((state: RootState) => state.stories)

export const selectStoriesByUser = createSelector(
    [selectAllStories, (_, userId: string) => userId],
    (stories, userId) => stories.filter(story => story.user._id === userId)
)
export default storiesSlice.reducer
