import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Story } from '../types/stories.types'
import TimeAgo from './TimeAgo'

const useStyles = makeStyles(
    createStyles({
        root: {
            margin: '2rem',
            padding: '1rem',
        },
        progress: {
            display: 'block',
            margin: '0 auto',
        },
    })
)

const StoryBoard = () => {
    const { storyId } = useParams<{ storyId: string }>()
    const classes = useStyles()
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

    let content: JSX.Element
    if (loading) {
        content = <CircularProgress className={classes.progress} />
    } else {
        content = (
            <React.Fragment>
                <Typography variant="h5" component="h1">
                    {story.title}
                </Typography>
                <div>
                    <TimeAgo timestamp={story.date} />
                </div>
                <p>{story.text}</p>
            </React.Fragment>
        )
    }

    return (
        <Paper component="article" className={classes.root}>
            {content}
        </Paper>
    )
}

export default StoryBoard
