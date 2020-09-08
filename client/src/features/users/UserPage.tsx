import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { selectUserById } from './usersSlice'
import { selectStoriesByUser } from '../stories/storiesSlice'

const UserPage = () => {
    const { userId } = useParams<{ userId: string }>()
    const user = useSelector((state: RootState) => selectUserById(state, userId))

    const storiesForUser = useSelector((state: RootState) => selectStoriesByUser(state, userId))

    const storyTitles = storiesForUser.map(story => (
        <li key={story._id}>
            <Link to={`/story/${story._id}`}>{story.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>{storyTitles}</ul>
        </section>
    )
}

export default UserPage
