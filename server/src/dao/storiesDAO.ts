import { Db, Collection, ObjectId } from 'mongodb'
import { Story } from '../types/stories.types'
import { DbResponse } from '../types/response.types'
import pino from 'pino'

let stories: Collection
const logger = pino()

export default class StoriesDAO {
    static inject(db: Db): void {
        stories = db.collection('stories')
    }

    static async getRoot(): Promise<DbResponse<Story>> {
        try {
            const data: Story = await stories.findOne({ parent: { $type: 'null' } })
            return { success: true, data }
        } catch (e) {
            logger.error(`Error in fetching root story: ${e}`)
            return { success: false }
        }
    }

    static async getStoryById(id: string): Promise<DbResponse<Story>> {
        try {
            const data: Story = await stories.findOne({ _id: new ObjectId(id) })
            return { success: true, data }
        } catch (e) {
            logger.error(`Error in fetching story ${id}: ${e}`)
            return { success: false }
        }
    }

    static async getChildren(id: string): Promise<DbResponse<Story[]>> {
        try {
            const data: Story[] = await stories.find({ parent: new ObjectId(id) }).toArray()
            return { success: true, data }
        } catch (e) {
            logger.error(`Error in getting children of ${id}: ${e}`)
            return { success: false }
        }
    }

    static async getTree(id: string): Promise<DbResponse<Story[]>> {
        try {
            const treeWrappers: { tree: Story[] }[] = await stories
                .aggregate([
                    { $match: { _id: new ObjectId(id) } },
                    {
                        $graphLookup: {
                            from: 'stories',
                            startWith: '$parent',
                            connectFromField: 'parent',
                            connectToField: '_id',
                            as: 'tree',
                        },
                    },
                    // To maintain order, it is possible to to an $unwind, a $sort, and then a $group.
                    // However this is overly complicated so the sorting will be handled in the controller.
                    { $project: { _id: 0, tree: 1 } },
                ])
                .toArray()

            const tree = treeWrappers[0].tree
            tree.sort((s1, s2) => s1.depth - s2.depth)
            return { success: true, data: tree }
        } catch (e) {
            logger.error(`Error in getting tree of ${id}: ${e}`)
            return { success: false }
        }
    }

    static async getRecent(): Promise<DbResponse<Story[]>> {
        try {
            const data: Story[] = await stories.find({}, { limit: 10, sort: { date: -1 } }).toArray()
            return { success: true, data }
        } catch (e) {
            logger.error(`Error in getting recent stories: ${e}`)
            return { success: false }
        }
    }
}
