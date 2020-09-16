import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { LoadingStatus } from '../../types/statuses.types'
import { RootState, useAppDispatch } from '../../app/store'
import { selectStoryIds, fetchStories, selectStoryById } from './storiesSlice'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        excerpt: {
            padding: theme.spacing(1),
            margin: theme.spacing(1),
        },
        title: {
            marginTop: theme.spacing(2)
        }
    })
)

const StoryExcerpt = ({ storyId }) => {
    const classes = useStyles()

    const story = useSelector((state: RootState) => selectStoryById(state, storyId))
    return (
        <Paper className={classes.excerpt} component="section" key={story._id}>
            <Typography variant="h5">{story.title}</Typography>
            <Typography variant="body1">{story.text}</Typography>
            <Link to={`/story/${story._id}`}>View Story</Link>
        </Paper>
    )
}

const StoryList = () => {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const storyIds = useSelector(selectStoryIds)
    const loadingStatus = useSelector((state: RootState) => state.stories.status)
    const error = useSelector((state: RootState) => state.stories.error)

    useEffect(() => {
        if (loadingStatus == LoadingStatus.idle) {
            dispatch(fetchStories())
        }
    }, [loadingStatus, dispatch])

    let content: JSX.Element | JSX.Element[]
    if (loadingStatus === LoadingStatus.loading) {
        content = <div>Loading...</div>
    } else if (loadingStatus === LoadingStatus.succeeded) {
        content = storyIds.map(storyId => <StoryExcerpt key={storyId} storyId={storyId} />)
    } else if (loadingStatus === LoadingStatus.failed) {
        content = <div>{error}</div>
    }

    return (
        <section>
            <Typography className={classes.title} variant="h4">Stories</Typography>
            {content}
        </section>
    )
}

export default StoryList
