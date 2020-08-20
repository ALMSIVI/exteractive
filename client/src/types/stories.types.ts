export interface Story {
    id: string
    title: string
    text: string
    parent: string
    children: [string]
}
