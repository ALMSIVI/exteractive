import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Story } from '../types/stories.types'

interface ChildStoriesProps {
    story: Story
    ready: boolean
}

/**
 * Displays an excerpt of the parent story.
 */
const ChildStories = ({ story, ready }: ChildStoriesProps) => {
    const [children, setChildren] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await Axios.get(`/api/stories/children/${story._id}`)
                const newChildren: Story[] = res.data
                setChildren(newChildren)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        if (ready) {
            fetchChildren()
        }
    }, [ready])

    let contents: JSX.Element
    if (loading) {
        contents = <span>Loading...</span>
    } else if (error) {
        contents = <span>Cannot fetch children 🤷</span>
    } else if (children.length === 0) {
        contents = <span>No sequels for this story. Write your own below!</span>
    } else {
        contents = (
            <ul>
                {children.map((child, index) => (
                    <li key={index}>
                        <Link to={`/story/${child._id}`}>{child.title}</Link>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section>
            <Typography variant="h6" component="h2">
                Sequels
            </Typography>
            {contents}
        </section>
    )
}

export default ChildStories
