import { Collection, Db, ObjectId } from 'mongodb'
import { beforeAll, afterAll } from 'vitest'

import storiesData from '../data/stories.json'

const db: Db = global['db']
const stories: Collection = db.collection('stories')

beforeAll(() => {
    stories.insertMany(
        storiesData.map(story => ({
            ...story,
            _id: new ObjectId(story._id),
            parent: story.parent == null ? null : new ObjectId(story.parent),
            date: new Date(story.date),
        }))
    )
})

afterAll(() => {
    stories.deleteMany({})
})
