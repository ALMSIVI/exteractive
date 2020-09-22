import { Request, Response } from 'express'
import StoriesDAO from '../dao/storiesDAO'
import { DbResponse } from '../types/response.types'
import { Story } from '../types/stories.types'

export default class StoriesController {
    static async apiGetRoot(_: Request, res: Response): Promise<void> {
        const dbRes: DbResponse<Story> = await StoriesDAO.getRoot()
        if (!dbRes.success) {
            res.status(400)
        } else if (dbRes.data === null) {
            res.status(404)
        }

        res.json(dbRes.data)
    }

    static async apiGetStory(req: Request, res: Response): Promise<void> {
        const dbRes: DbResponse<Story> = await StoriesDAO.getStoryById(req.params.id)
        if (!dbRes.success) {
            res.status(400)
        } else if (dbRes.data === null) {
            res.status(404)
        }

        res.json(dbRes.data)
    }

    static async apiGetChildren(req: Request, res: Response): Promise<void> {
        const dbRes: DbResponse<Story[]> = await StoriesDAO.getChildren(req.params.id)
        if (!dbRes.success) {
            res.status(400)
        } else if (dbRes.data === null) {
            res.status(404)
        }

        res.json(dbRes.data)
    }

    static async apiGetTree(req: Request, res: Response): Promise<void> {
        const dbRes: DbResponse<Story[]> = await StoriesDAO.getTree(req.params.id)
        if (!dbRes.success) {
            res.status(400)
        } else if (dbRes.data === null) {
            res.status(404)
        }

        res.json(dbRes.data)
    }

    static async apiGetRecent(_: Request, res: Response): Promise<void> {
        const dbRes: DbResponse<Story[]> = await StoriesDAO.getRecent()
        if (!dbRes.success) {
            res.status(400)
        } else if (dbRes.data === null) {
            res.status(404)
        }

        res.json(dbRes.data)
    }
}
