import { Request, Response } from 'express'
import StoriesDAO from '../dao/storiesDAO'
import { Story } from '../types/stories.types'

export default class StoriesController {
    static async apiGetRoot(_: Request, res: Response): Promise<void> {
        const story: Story = await StoriesDAO.getRoot()
        res.json(story)
    }

    static async apiGetStory(req: Request, res: Response): Promise<void> {
        const story: Story = await StoriesDAO.getStoryById(req.params.id)
        res.json(story)
    }

    static async apiGetChildren(req: Request, res: Response): Promise<void> {
        const stories: Story[] = await StoriesDAO.getChildren(req.params.id)
        res.json(stories)
    }

    static async apiGetTree(req: Request, res: Response): Promise<void> {
        const tree: Story[] = await StoriesDAO.getTree(req.params.id)
        res.json(tree)
    }
}
