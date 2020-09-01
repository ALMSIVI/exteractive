import { describe, beforeAll, expect, test } from '@jest/globals'
import StoriesDAO from '../src/dao/storiesDAO'
import { ObjectId } from 'mongodb'

describe('Getting stories', () => {
    beforeAll(() => {
        StoriesDAO.inject(global['db'])
    })

    test('Root story can be retrieved', async () => {
        try {
            const root = await StoriesDAO.getRoot()
            expect(root.title).toBe('The Beginning')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Story can be retrieved', async () => {
        try {
            const story = await StoriesDAO.getStoryById('5f3603b0b6372b04780a6b4a')
            expect(story.title).toBe('Fantasy')
            expect(story.parent).toEqual(new ObjectId('5f34de2b3ab21d58636a1103'))
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Children and tree can be retrieved', async () => {
        try {
            const story = await StoriesDAO.getChildren('5f3603b0b6372b04780a6b4a')
            expect(story[0].title).toBe('Country')
            const tree = await StoriesDAO.getTree(story[0]._id.toHexString())
            expect(tree.length).toBe(2)
            expect(tree[0].title).toBe('Fantasy')
            expect(tree[1].title).toBe('The Beginning')
        } catch (e) {
            expect(e).toBeNull()
        }
    })
})
