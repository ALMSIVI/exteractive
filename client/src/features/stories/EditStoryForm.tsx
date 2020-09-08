import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectStoryById, storyUpdated } from './storiesSlice'
import { RootState, useAppDispatch } from '../../app/store'

const EditStoryForm = () => {
    const { storyId } = useParams<{ storyId: string }>()

    const story = useSelector((state: RootState) => selectStoryById(state, storyId))

    const [title, setTitle] = useState(story.title)
    const [text, setText] = useState(story.text)

    const dispatch = useAppDispatch()
    const history = useHistory()

    const onSaveStory = () => {
        if (title && text) {
            dispatch(storyUpdated({ ...story, title, text }))
            history.push(`/story/${storyId}`)
        }
    }

    return (
        <section>
            <h2>Edit Story</h2>
            <form>
                <label htmlFor="storyTitle">Story Title:</label>
                <input
                    type="text"
                    id="storyTitle"
                    name="storyTitle"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="storyText">Content:</label>
                <textarea id="storyText" name="storyText" value={text} onChange={e => setText(e.target.value)} />
                <button type="button" onClick={onSaveStory}>
                    Save Story
                </button>
            </form>
        </section>
    )
}

export default EditStoryForm
