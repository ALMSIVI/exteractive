import React from 'react'
import { reactionAdded } from './storiesSlice'
import { Story, Reaction } from '../../types/stories.types'
import { useAppDispatch } from '../../app/store'
import { Button } from '@material-ui/core'

const reactionEmoji: { [key in Reaction]: string } = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
}

type ReactionButtonsProps = { story: Story }
export const ReactionButtons = ({ story }: ReactionButtonsProps) => {
    const dispatch = useAppDispatch()

    const reactions = story.reactions ? story.reactions : {}

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <Button
                key={name}
                onClick={() => dispatch(reactionAdded({ storyId: story._id, reaction: Reaction[name] }))}
            >
                {emoji} {reactions[name] || 0}
            </Button>
        )
    })

    return <div>{reactionButtons}</div>
}
