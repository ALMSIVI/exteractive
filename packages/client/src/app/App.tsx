import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoryList from '../components/StoryList'
import SingleStoryPage from '../components/SingleStoryPage'
import Navbar from './Navbar'
import { Container } from '@mui/material'

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Container>
            <Routes>
                <Route path="/" element={<StoryList />} />
                <Route path="/story/:storyId" element={<SingleStoryPage />} />
            </Routes>
        </Container>
    </BrowserRouter>
)

export default App
