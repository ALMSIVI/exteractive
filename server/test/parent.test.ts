import { describe, expect, test } from '@jest/globals'
import { Collection } from 'mongodb'

describe('Getting root story', () => {
    test('Root story can be retrieved', async () => {
        const collection: Collection = global['db'].collection('stories')
        try {
            const root = await collection.findOne({ parent: 'root' })
            expect(root.title).toBe('The Beginning')
        } catch (e) {
            expect(e).toBeNull()
        }
    })
})
