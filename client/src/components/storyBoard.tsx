import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Story } from '../types/stories.types'

const StoryBoard = () => {
    const [title, setTitle] = useState('Story Title')
    const [text, setText] = useState('Story Text')

    useEffect(() => {
        const fetchStory = async () => {
            const res = await axios.get('/api/stories/root')
            const story: Story = res.data
            setTitle(story.title)
            setText(story.text)
        }

        fetchStory()
    })

    return (
        <div>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}

export default StoryBoard
