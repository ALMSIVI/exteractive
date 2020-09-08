import { User } from './users.types'

export enum Reaction {
    thumbsUp = 'thumbsUp',
    hooray = 'hooray',
    heart = 'heart',
    rocket = 'rocket',
    eyes = 'eyes'
}

export interface Story {
    _id?: string
    title: string
    text: string
    parent: string
    depth: number
    date: string
    user: User
    reactions?: { [key in Reaction]?: number }
}
