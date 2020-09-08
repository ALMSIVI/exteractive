import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { useAppDispatch } from '../../app/store'

const NotificationsList = () => {
    const dispatch = useAppDispatch()
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)

    useEffect(() => {
        dispatch(allNotificationsRead())
    })

    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user._id === notification.user) || {
            name: 'Unknown User',
        }

        return (
            <div key={notification.id}>
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )
    })

    return (
        <section>
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )
}

export default NotificationsList
