import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'
import { Typography, Button } from '@material-ui/core'

const Navbar = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotifications)
    const numUnreadNotifications = notifications.filter(n => !n.read).length

    let unreadNotificationBadge: JSX.Element
    if (numUnreadNotifications > 0) {
        unreadNotificationBadge = <span>{numUnreadNotifications}</span>
    }

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications())
    }

    return (
        <nav>
            <section>
                <Typography variant="h1">Exteractive</Typography>

                <div>
                    <div>
                        <Link to="/">Posts</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/notifications">Notifications {unreadNotificationBadge}</Link>
                    </div>
                    <Button variant="contained" onClick={fetchNewNotifications}>Refresh Notifications</Button>
                </div>
            </section>
        </nav>
    )
}

export default Navbar
