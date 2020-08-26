import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import StoryBoard from '../src/components/storyBoard'

const server = setupServer(rest.get('/api/stories/root', (req, res, ctx) => res(ctx.json({ text: 'Hello World' }))))

describe('Story rendering', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('Loads and displays story', async () => {
        render(<StoryBoard />)
        await waitFor(() => screen.getByText('Hello World'))
        expect(screen.getByText('Hello World')).toHaveStyle('color: red')
    })
})
