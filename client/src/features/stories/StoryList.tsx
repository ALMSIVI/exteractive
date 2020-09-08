import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectStoryIds, fetchStories, selectStoryById } from './storiesSlice'
import { Link } from 'react-router-dom'
import { LoadingStatus } from '../../types/statuses.types'
import { RootState, useAppDispatch } from '../../app/store'

const StoryExcerpt = ({ storyId }) => {
    const story = useSelector((state: RootState) => selectStoryById(state, storyId))
    return (
        <article key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <Link to={`/story/${story._id}`}>View Story</Link>
        </article>
    )
}

const StoryList = () => {
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
            <h2>Stories</h2>
            {content}
        </section>
    )
}

export default StoryList
