import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StoryList from '../components/StoryList'
import SingleStoryPage from '../components/SingleStoryPage'
import Navbar from './Navbar'
import { Container } from '@material-ui/core'

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Container>
            <Switch>
                <Route exact path="/">
                    <StoryList />
                </Route>
                <Route exact path="/story/:storyId">
                    <SingleStoryPage />
                </Route>
            </Switch>
        </Container>
    </BrowserRouter>
)

export default App
