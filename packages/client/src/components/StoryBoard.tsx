import { CircularProgress, Paper, Typography } from '@mui/material'
import { Story } from '../types/stories.types'
import TimeAgo from './TimeAgo'

interface StoryBoardProps {
    story: Story
    loading: boolean
}

const StoryBoard = ({ story, loading }: StoryBoardProps) => {
    let content: JSX.Element
    if (loading) {
        content = (
            <CircularProgress
                sx={{
                    display: 'block',
                    margin: '0 auto',
                }}
            />
        )
    } else {
        content = (
            <article>
                <Typography variant="h5" component="h1">
                    {story.title}
                </Typography>
                <div>
                    <TimeAgo timestamp={story.date} />
                </div>
                <main>
                    {story.text.split(/\n+/).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </main>
            </article>
        )
    }

    return (
        <Paper
            sx={{
                margin: '2rem 0',
                padding: '1rem',
            }}
        >
            {content}
        </Paper>
    )
}

export default StoryBoard
