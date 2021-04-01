import { describe, beforeAll, expect, it } from 'vitest'
import StoriesDAO from '../src/dao/storiesDAO'
import { ObjectId } from 'mongodb'

describe('Getting stories', () => {
    beforeAll(() => {
        StoriesDAO.inject(global['db'])
    })

    it('Root story can be retrieved', async () => {
        try {
            const dbRes = await StoriesDAO.getRoot()
            expect(dbRes.success).toBe(true)
            expect(dbRes.data.title).toBe('Root Story')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Story can be retrieved', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('5f3603b0b6372b04780a6b4a')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data.title).toBe('First Child')
            expect(dbRes.data.parent).toEqual(new ObjectId('5f34de2b3ab21d58636a1103'))
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Story not found', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('5f34de2b3ab21d58636a1102')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data).toBeNull()
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Invalid story ID', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('0000')
            expect(dbRes.success).toBe(false)
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Children and tree can be retrieved', async () => {
        try {
            let dbRes = await StoriesDAO.getChildren('5f3603b0b6372b04780a6b4a')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data[0].title).toBe('First Child of 1')
            dbRes = await StoriesDAO.getTree(dbRes.data[0]._id.toHexString())
            expect(dbRes.success).toBe(true)
            expect(dbRes.data).toHaveLength(2)
            expect(dbRes.data[0].title).toBe('Root Story')
            expect(dbRes.data[1].title).toBe('First Child')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Recent stories can be retrieved', async () => {
        try {
            const dbRes = await StoriesDAO.getRecent()
            expect(dbRes.success).toBe(true)
            expect(dbRes.data.length).toBeLessThanOrEqual(10)
            const actualDates = dbRes.data.map(s => s.date)
            const expectedDates = actualDates.slice().sort((d1, d2) => d2.getTime() - d1.getTime())
            expect(actualDates).toEqual(expectedDates)
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    it('Stories can be added, updated and deleted', async () => {
        const newStory = {
            title: 'New Story',
            text: 'New Text',
            parent: new ObjectId('5f34de2b3ab21d58636a1103'),
            depth: 1,
            date: new Date(),
        }
        const addRes = await StoriesDAO.add(newStory)
        expect(addRes.success).toBe(true)
        expect(addRes.data.title).toEqual('New Story')

        const id = addRes.data._id.toHexString()
        newStory.title = 'Updated Story'
        const updateRes = await StoriesDAO.update(id, newStory)
        expect(updateRes.success).toBe(true)
        expect(updateRes.data).toBe(true)

        const deleteRes = await StoriesDAO.delete(id)
        expect(deleteRes.success).toBe(true)
        expect(deleteRes.data).toBe(true)
    })

    it('Errors for update and delete can be handled', async () => {
        const nonexistentStory = {
            title: 'Nonexistent Story',
            text: 'Nonexistent Text',
            parent: new ObjectId('5f34de2b3ab21d58636a1103'),
            depth: 1,
            date: new Date(),
        }

        let dbRes = await StoriesDAO.update('ffffffffffffffffffffffff', nonexistentStory)
        expect(dbRes.success).toBe(true)
        expect(dbRes.data).toBe(false)

        dbRes = await StoriesDAO.update('f', nonexistentStory)
        expect(dbRes.success).toBe(false)

        dbRes = await StoriesDAO.delete('ffffffffffffffffffffffff')
        expect(dbRes.success).toBe(true)
        expect(dbRes.data).toBe(false)

        dbRes = await StoriesDAO.delete('f')
        expect(dbRes.success).toBe(false)
    })
})
