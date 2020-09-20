import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Story } from '../types/stories.types'
import TimeAgo from './TimeAgo'

const StoryBoard = () => {
    const { storyId } = useParams<{ storyId: string }>()

    const [story, setStory] = useState<Story>({
        title: 'Story Title',
        text: 'Story Text',
        parent: '0',
        depth: -1,
        date: new Date().toISOString(),
    })

    useEffect(() => {
        let unmounted: boolean = false

        const fetchStory = async () => {
            const res = await axios.get(`/api/stories/story/${storyId}`)
            const newStory: Story = res.data

            if (!unmounted) {
                if (!newStory) {
                    setStory({ ...story, title: 'Error', text: 'Story Not Found!' })
                } else {
                    setStory(newStory)
                }
            }
        }

        fetchStory()
        return () => {
            unmounted = true
        }
    })

    return (
        <article>
            <h1>{story.title}</h1>
            <div>
                <TimeAgo timestamp={story.date} />
            </div>
            <p>{story.text}</p>
        </article>
    )
}

export default StoryBoard
