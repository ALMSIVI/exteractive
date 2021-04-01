import { DateTime } from 'luxon'

interface TimeAgoProps {
    timestamp: string
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
    let timeAgo = ''
    if (timestamp) {
        const date = DateTime.fromISO(timestamp)
        const timePeriod = date.toRelative()
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo
