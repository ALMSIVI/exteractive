import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addStory } from './storiesSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useAppDispatch } from '../../app/store'
import { LoadingStatus } from '../../types/statuses.types'

const AddStoryForm = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState(LoadingStatus.idle)

    const dispatch = useAppDispatch()
    const users = useSelector(selectAllUsers)

    const canSave = [title, text, userId].every(Boolean) && addRequestStatus === LoadingStatus.idle

    const onAddStory = async () => {
        if (canSave) {
            try {
                setAddRequestStatus(LoadingStatus.loading)
                const resultAction = await dispatch(
                    addStory({
                        _id: title,
                        title,
                        text,
                        parent: '',
                        depth: 0,
                        date: new Date().toISOString(),
                        user: users.find(user => user._id === userId),
                    })
                )

                unwrapResult(resultAction)
                setTitle('')
                setText('')
                setUserId('')
            } catch (err) {
                console.error(`Failed to add post: ${err}`)
            } finally {
                setAddRequestStatus(LoadingStatus.idle)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user._id} value={user._id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Story</h2>
            <form>
                <label htmlFor="storyTitle">Story Title:</label>
                <input
                    type="text"
                    id="storyTitle"
                    name="storyTitle"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="storyAuthor">Author:</label>
                <select id="storyAuthor" value={userId} onChange={e => setUserId(e.target.value)}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="storyText">Content:</label>
                <textarea id="storyText" name="storyText" value={text} onChange={e => setText(e.target.value)} />
                <button type="button" onClick={onAddStory} disabled={!canSave}>
                    Add Story
                </button>
            </form>
        </section>
    )
}

export default AddStoryForm
