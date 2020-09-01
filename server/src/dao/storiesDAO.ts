import { Db, Collection, ObjectId } from 'mongodb'
import { Story } from '../types/stories.types'
import pino from 'pino'

let stories: Collection
const logger = pino()

export default class StoriesDAO {
    static inject(db: Db): void {
        stories = db.collection('stories')
    }

    static async getRoot(): Promise<Story> {
        try {
            return await stories.findOne({ parent: { $type: 'null' } })
        } catch (e) {
            logger.error(`Error in fetching root story: ${e}`)
            return null
        }
    }

    static async getStoryById(id: string): Promise<Story> {
        try {
            return await stories.findOne({ _id: new ObjectId(id) })
        } catch (e) {
            logger.error(`Error in fetching story ${id}: ${e}`)
            return null
        }
    }

    static async getChildren(id: string): Promise<Story[]> {
        try {
            return await stories.find({ parent: new ObjectId(id) }).toArray()
        } catch (e) {
            logger.error(`Error in getting children of ${id}: ${e}`)
            return null
        }
    }

    static async getTree(id: string): Promise<Story[]> {
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
                            depthField: 'depth',
                        },
                    },
                    // To maintain order, it is possible to to an $unwind, a $sort, and then a $group.
                    // However this is overly complicated so the sorting will be handled in the controller.
                    { $project: { _id: 0, tree: 1 } },
                ])
                .toArray()
                
                const tree = treeWrappers[0].tree
                tree.sort((s1, s2) => s1.depth - s2.depth)
            return tree
        } catch (e) {
            logger.error(`Error in getting tree of ${id}: ${e}`)
            return null
        }
    }
}
