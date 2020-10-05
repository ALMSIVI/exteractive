import React, { useState, useEffect } from 'react'
import Axios, { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Tab, Tabs } from '@material-ui/core'
import { Story } from '../types/stories.types'
import AddStoryForm from './AddStoryForm'
import StoryBoard from './StoryBoard'
import EditStoryForm from './EditStoryForm'
import ParentStory from './ParentStory'
import ChildStories from './ChildStories'

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`forms-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
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
                setLoading(true)
                const res = await Axios.get(`/api/stories/story/${storyId}`)
                const newStory: Story = res.data
                setStory(newStory)
            } catch (e) {
                const axiosError: AxiosError = e
                const status = axiosError.response.status
                let text = axiosError.message
                
                if (status === 404) {
                    text = 'Cannot find story'
                } else if (status === 400) {
                    text = 'Invalid story id'
                }

                setStory({ ...story, title: 'Error', text })
            } finally {
                setLoading(false)
            }
        }

        fetchStory()
    }, [storyId])

    return (
        <>
            <ParentStory story={story} ready={!loading} />
            <StoryBoard story={story} loading={loading} />
            <ChildStories story={story} ready={!loading} />
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
        </>
    )
}

export default SingleStoryPage
