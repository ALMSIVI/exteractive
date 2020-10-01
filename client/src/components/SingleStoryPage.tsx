import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Story } from '../types/stories.types'
import StoryBoard from './StoryBoard'

const SingleStoryPage = () => {
    const { storyId } = useParams<{ storyId: string }>()
    const [loading, setLoading] = useState(true)
    const [story, setStory] = useState<Story>({
        title: 'Story Title',
        text: 'Story Text',
        parent: '0',
        depth: -1,
        date: new Date().toISOString(),
    })

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get(`/api/stories/story/${storyId}`)
                const newStory: Story = res.data
                setStory(newStory)
            } catch (e) {
                setStory({ ...story, title: 'Error', text: 'Cannot find story' })
            } finally {
                setLoading(false)
            }
        }

        fetchStory()
    }, [])

    return (
        <Fragment>
            <StoryBoard story={story} loading={loading} />
        </Fragment>
    )
}

export default SingleStoryPage
