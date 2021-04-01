import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import Axios from 'axios'
import { Story } from '../types/stories.types'

interface EditStoryFormProps {
    story: Story
}

const EditStoryForm = ({ story }: EditStoryFormProps) => {
    const [title, setTitle] = useState(story.title)
    const [text, setText] = useState(story.text)
    const [loading, setLoading] = useState(false)

    const canSave = [title, text].every(Boolean) && !loading

    const onSaveStory = async () => {
        if (canSave) {
            try {
                setLoading(true)
                const result = await Axios.put(`/api/stories/update/${story._id}`, {
                    ...story,
                    title,
                    text,
                    date: new Date().toISOString(),
                })

                // TODO: indicate that the save is successful
            } catch (err) {
                console.error(`Failed to save post: ${err}`)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <section>
            <h2>Edit Story</h2>
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
                <Button variant="contained" onClick={onSaveStory} disabled={!canSave}>
                    Save Story
                </Button>
            </form>
        </section>
    )
}

export default EditStoryForm
