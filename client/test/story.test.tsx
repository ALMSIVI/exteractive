import React from 'react'
import { render, screen, waitFor } from './config/test-utils'
import StoryBoard from '../src/components/StoryBoard'
import { Route } from 'react-router-dom'

describe('Story rendering', () => {
    test('Loads and displays story', async () => {
        try {
            render(
                <Route path="/story/:storyId">
                    <StoryBoard />
                </Route>,
                { route: '/story/0' }
            )
            await waitFor(() => screen.getByText('Text 0'))
            expect(screen.getByText('Text 0')).not.toBeNull()
        } catch (e) {
            expect(e).toBeNull()
        }
    })
})
