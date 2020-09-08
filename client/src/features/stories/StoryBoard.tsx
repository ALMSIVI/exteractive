import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Story } from '../../types/stories.types'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStoryById } from './storiesSlice'
import StoryAuthor from './StoryAuthor'
import TimeAgo from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { RootState } from '../../app/store'

const StoryBoard = () => {
    const { storyId } = useParams<{ storyId: string }>()

    const story: Story = useSelector((state: RootState) => selectStoryById(state, storyId))

    if (!story) {
        return (
            <section>
                <h2>Story not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article>
                <h2>{story.title}</h2>
                <div>
                    <StoryAuthor user={story.user} />
                    <TimeAgo timestamp={story.date} />
                </div>
                <p
                    css={css`
                        color: red;
                    `}
                >
                    {story.text}
                </p>
                <ReactionButtons story={story} />
                <Link to={`/story/edit/${story._id}`}>Edit Story</Link>
            </article>
        </section>
    )
}

export default StoryBoard
