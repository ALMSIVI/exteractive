import React, { useEffect, useState } from 'react'
import Axios, { AxiosError } from 'axios'
import { Link } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Story } from '../types/stories.types'

interface ParentStoryProps {
    story: Story
    ready: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            margin: theme.spacing(1),
        },
    })
)

/**
 * Displays an excerpt of the parent story.
 */
const ParentStory = ({ story, ready }: ParentStoryProps) => {
    const classes = useStyles()

    const [parent, setParent] = useState<Story>({
        _id: '0',
        title: 'Parent Story',
        text: 'Parent Text',
        depth: story.depth - 1,
        date: story.date,
        parent: '0',
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchParent = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await Axios.get(`/api/stories/story/${story.parent}`)
                const newParent: Story = res.data
                setParent(newParent)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        if (ready) {
            fetchParent()
        }
    }, [ready])

    let contents: JSX.Element
    if (loading) {
        contents = <span className={classes.root}>Loading...</span>
    } else if (error) {
        contents = <span className={classes.root}>No parent story 🤷</span>
    } else {
        contents = (
            <Link className={classes.root} component={RouterLink} to={`/story/${parent._id}`}>
                {parent.title}
            </Link>
        )
    }

    return <section>{contents}</section>
}

export default ParentStory
