import React from 'react'
import { render, screen, waitFor } from './config/test-utils'
import { Route } from 'react-router-dom'
import StoryBoard from '../src/components/StoryBoard'
import StoryList from '../src/components/StoryList'

describe('Story rendering', () => {
    test('Loads and displays story board', async () => {
        try {
            render(
                <Route path="/story/:storyId">
                    <StoryBoard />
                </Route>,
                { route: '/story/0' }
            )
            await waitFor(() => screen.getByRole('article'))
            expect(screen.getByRole('heading')).toHaveTextContent('Test 0')
            expect(screen.getByRole('main')).toHaveTextContent('Text 0')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Loads and displays story list', async () => {
        try {
            render(
                <Route path="/">
                    <StoryList />
                </Route>,
                { route: '/' }
            )
            await waitFor(() => screen.getByRole('list'))
            expect(screen.getAllByRole('listitem')).toHaveLength(1)
        } catch (e) {
            expect(e).toBeNull()
        }
    })
})
