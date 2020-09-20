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
    },
]

const handlers = [
    rest.get('/api/stories/story/:storyId', (req, res, ctx) => {
        const { storyId } = req.params
        return res(ctx.json(stories.find(story => story._id === storyId)))
    }),
]

export default handlers
