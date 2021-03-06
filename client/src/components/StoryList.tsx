import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Axios from 'axios'
import { Story } from '../types/stories.types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        excerpt: {
            padding: theme.spacing(1),
            margin: theme.spacing(1),
        },
        title: {
            marginTop: theme.spacing(2),
        },
    })
)

interface excerptProps {
    story: Story
}

const StoryExcerpt = ({ story }: excerptProps) => {
    const classes = useStyles()
    return (
        <Paper className={classes.excerpt} component="article" key={story._id} role="listitem">
            <Typography variant="h5">{story.title}</Typography>
            <Typography variant="body1">{story.text}</Typography>
            <Link to={`/story/${story._id}`}>View Story</Link>
        </Paper>
    )
}

const StoryList = () => {
    const classes = useStyles()
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await Axios.get('/api/stories/recent')
                const newStories: Story[] = res.data
                setStories(newStories)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        fetchRecent()
    }, [])

    let content: JSX.Element
    if (loading) {
        content = <div>Loading...</div>
    } else if (error !== '') {
        content = <div>{error}</div>
    } else {
        content = (
            <div role="list">
                {stories.map(story => (
                    <StoryExcerpt key={story._id} story={story} />
                ))}
            </div>
        )
    }

    return (
        <section>
            <Typography className={classes.title} variant="h4">
                Stories
            </Typography>
            {content}
        </section>
    )
}

export default StoryList
