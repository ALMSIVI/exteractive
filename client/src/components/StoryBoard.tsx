import React from 'react'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ReactMarkdown from 'react-markdown'
import { Story } from '../types/stories.types'
import TimeAgo from './TimeAgo'

const useStyles = makeStyles(
    createStyles({
        root: {
            margin: '2rem 0',
            padding: '1rem',
        },
        progress: {
            display: 'block',
            margin: '0 auto',
        },
    })
)

interface StoryBoardProps {
    story: Story
    loading: boolean
}

const StoryBoard = ({ story, loading }: StoryBoardProps) => {
    const classes = useStyles()

    let content: JSX.Element
    if (loading) {
        content = <CircularProgress className={classes.progress} />
    } else {
        content = (
            <article>
                <Typography variant="h5" component="h1">
                    {story.title}
                </Typography>
                <div>
                    <TimeAgo timestamp={story.date} />
                </div>
                <main>
                    <ReactMarkdown source={story.text} />
                </main>
            </article>
        )
    }

    return <Paper className={classes.root}>{content}</Paper>
}

export default StoryBoard
