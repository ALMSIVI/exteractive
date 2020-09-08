import { rest } from 'msw'
import { Story } from '../../src/types/stories.types'

const stories: Story[] = [
    {
        _id: '0',
        title: 'Test 0',
        text: 'Text 0',
        parent: null,
        depth: 0,
        date: '2020-01-01T00:00:00.000',
        user: {
            _id: '0',
            name: 'User 0',
        },
    },
]

const handlers = [
    rest.get('/api/stories/root', (_, res, ctx) => res(ctx.json(stories[0]))),
    rest.get('/api/stories/recent', (_, res, ctx) => res(ctx.json(stories))),
]

export default handlers
