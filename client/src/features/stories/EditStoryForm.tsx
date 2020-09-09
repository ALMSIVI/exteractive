import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectStoryById, storyUpdated } from './storiesSlice'
import { RootState, useAppDispatch } from '../../app/store'
import { TextField, Button } from '@material-ui/core'

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
                <TextField label="Story Title" defaultValue={title} onChange={e => setTitle(e.target.value)} />
                <TextField
                    label="Content"
                    defaultValue={text}
                    onChange={e => setText(e.target.value)}
                    multiline
                    rows={10}
                />
                <Button variant="contained" onClick={onSaveStory} >
                    Save Story
                </Button>
            </form>
        </section>
    )
}

export default EditStoryForm
