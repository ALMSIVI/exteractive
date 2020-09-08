import React from 'react'
import { render, screen, waitFor, store } from './test-utils'
import StoryBoard from '../src/features/stories/StoryBoard'
import { Route } from 'react-router-dom'
import { fetchStories } from '../src/features/stories/storiesSlice'

describe('Story rendering', () => {
    test('Loads and displays story', async () => {
        try {
            store.dispatch(fetchStories())
            render(
                <Route path="/story/:storyId">
                    <StoryBoard />
                </Route>,
                { route: '/story/0' }
            )
            await waitFor(() => screen.getByText('Text 0'))
            expect(screen.getByText('Text 0')).toHaveStyle('color: red')
        } catch (e) {
            expect(e).toBeNull()
        }
    })
})
