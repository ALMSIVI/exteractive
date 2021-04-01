import React, { useState, useEffect, Fragment } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'
import { Story } from '../types/stories.types'
import AddStoryForm from './AddStoryForm'
import StoryBoard from './StoryBoard'
import EditStoryForm from './EditStoryForm'

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`forms-${index}`} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    )
}

const SingleStoryPage = () => {
    const { storyId } = useParams<{ storyId: string }>()
    const [loading, setLoading] = useState(true)
    const [story, setStory] = useState<Story>({
        title: 'Story Title',
        text: 'Story Text',
        parent: '0',
        depth: -1,
        date: new Date().toISOString(),
    })

    const [value, setValue] = useState(0)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await Axios.get(`/api/stories/story/${storyId}`)
                const newStory: Story = res.data
                setStory(newStory)
            } catch (e) {
                setStory({ ...story, title: 'Error', text: 'Cannot find story' })
            } finally {
                setLoading(false)
            }
        }

        fetchStory()
    }, [])

    return (
        <Fragment>
            <StoryBoard story={story} loading={loading} />
            <Tabs value={value} onChange={(_, val) => setValue(val)}>
                <Tab label="Write Sequel" />
                <Tab label="Edit Story" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AddStoryForm parent={story} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EditStoryForm story={story} />
            </TabPanel>
        </Fragment>
    )
}

export default SingleStoryPage
