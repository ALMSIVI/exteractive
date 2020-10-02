import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import Axios from 'axios'
import { Story } from '../types/stories.types'

interface AddStoryFormProps {
    parent: Story
}

const AddStoryForm = ({ parent }: AddStoryFormProps) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    const canSave = [title, text].every(Boolean) && !loading

    const onAddStory = async () => {
        if (canSave) {
            try {
                setLoading(true)
                const result = await Axios.post('/api/stories/add', {
                    title,
                    text,
                    parent: parent._id,
                    depth: parent.depth + 1,
                    date: new Date().toISOString(),
                })

                setTitle('')
                setText('')
                // TODO: indicate that the add is successful
            } catch (err) {
                console.error(`Failed to add post: ${err}`)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <section>
            <h2>Write a Sequel</h2>
            <form>
                <TextField
                    label="Story Title"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    multiline
                    rows={10}
                />
                <Button variant="contained" onClick={onAddStory} disabled={!canSave}>
                    Add Sequel
                </Button>
            </form>
        </section>
    )
}

export default AddStoryForm
