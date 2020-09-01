import { ObjectId } from 'mongodb'

export interface Story {
    _id?: ObjectId
    title: string
    text: string
    parent: ObjectId | string
}
