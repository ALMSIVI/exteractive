import { describe, beforeAll, expect, test } from '@jest/globals'
import StoriesDAO from '../src/dao/storiesDAO'
import { ObjectId } from 'mongodb'

describe('Getting stories', () => {
    beforeAll(() => {
        StoriesDAO.inject(global['db'])
    })

    test('Root story can be retrieved', async () => {
        try {
            const dbRes = await StoriesDAO.getRoot()
            expect(dbRes.success).toBe(true)
            expect(dbRes.data.title).toBe('The Beginning')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Story can be retrieved', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('5f3603b0b6372b04780a6b4a')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data.title).toBe('Fantasy')
            expect(dbRes.data.parent).toEqual(new ObjectId('5f34de2b3ab21d58636a1103'))
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Story not found', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('5f34de2b3ab21d58636a1102')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data).toBeNull()
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Invalid story ID', async () => {
        try {
            const dbRes = await StoriesDAO.getStoryById('0000')
            expect(dbRes.success).toBe(false)
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Children and tree can be retrieved', async () => {
        try {
            let dbRes = await StoriesDAO.getChildren('5f3603b0b6372b04780a6b4a')
            expect(dbRes.success).toBe(true)
            expect(dbRes.data[0].title).toBe('Country')
            dbRes = await StoriesDAO.getTree(dbRes.data[0]._id.toHexString())
            expect(dbRes.success).toBe(true)
            expect(dbRes.data).toHaveLength(2)
            expect(dbRes.data[0].title).toBe('The Beginning')
            expect(dbRes.data[1].title).toBe('Fantasy')
        } catch (e) {
            expect(e).toBeNull()
        }
    })

    test('Recent stories can be retrieved', async () => {
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
})
