import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addStory } from './storiesSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useAppDispatch } from '../../app/store'
import { LoadingStatus } from '../../types/statuses.types'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'

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
        <MenuItem key={user._id} value={user._id}>
            {user.name}
        </MenuItem>
    ))

    return (
        <section>
            <h2>Add a New Story</h2>
            <form>
                <TextField
                    label="Story Title"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    defaultValue={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="author-label">Author</InputLabel>
                    <Select labelId="author-label" label="Author" value={userId} onChange={e => setUserId(e.target.value as string)}>
                        <MenuItem value="">Please select an author...</MenuItem>
                        {usersOptions}
                    </Select>
                </FormControl>
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue={text}
                    onChange={e => setText(e.target.value)}
                    multiline
                    rows={10}
                />
                <Button variant="contained" onClick={onAddStory} disabled={!canSave}>
                    Add Story
                </Button>
            </form>
        </section>
    )
}

export default AddStoryForm
