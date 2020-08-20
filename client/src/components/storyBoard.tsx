import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Story } from '../types/stories.types'

const StoryBoard = () => {
    const [title, setTitle] = useState('Story Title')
    const [text, setText] = useState('Story Text')

    useEffect(() => {
        const fetchStory = async () => {
            const res = await fetch('/api/stories/root')
            const story: Story = await res.json()
            setTitle(story.title)
            setText(story.text)
        }

        fetchStory()
    })

    return (
        <div>
            <h1>{title}</h1>
            <p
                css={css`
                    color: red;
                `}
            >
                {text}
            </p>
        </div>
    )
}

export default StoryBoard
