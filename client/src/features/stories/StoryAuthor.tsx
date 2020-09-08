import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { User } from '../../types/users.types'
import { RootState } from '../../app/store'

type StoryAuthorProps = {
    user: User
}

const StoryAuthor = ({ user }: StoryAuthorProps) => {
    let name: string
    if (user) {
        const author = useSelector((state: RootState) => selectUserById(state, user._id))
        name = author ? author.name : user.name
    } else {
        name = 'Unknown author'
    }
    
    return <span>by {name}</span>
}

export default StoryAuthor
