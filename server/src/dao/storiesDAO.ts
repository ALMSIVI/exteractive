import { Db, Collection } from 'mongodb'
import { Story } from '../types/stories.types'

let stories: Collection

export default class StoriesDAO {
    static inject(db: Db) {
        stories = db.collection('stories')
    }

    static async getRoot(): Promise<Story> {
        return await stories.findOne({ parent: 'root' })
    }
}
