export interface Story {
    _id?: string
    title: string
    text: string
    parent: string | null
    depth: number
    date: string
}
