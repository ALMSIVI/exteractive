import { ObjectID } from 'mongodb'

export interface Story {
    id: ObjectID
    title: string
    text: string
    parent: string
    children: [ObjectID]
}
