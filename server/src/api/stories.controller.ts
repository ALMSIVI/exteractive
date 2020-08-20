import { Response } from 'express'
import StoriesDAO from '../dao/storiesDAO'
import { Story } from '../types/stories.types'

export default class StoriesController {
    static async apiGetRoot(_, res: Response) {
        const story: Story = await StoriesDAO.getRoot()
        res.json(story)
    }
}
