import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StoryBoard from '../components/StoryBoard'
import Navbar from './Navbar'
import { Container } from '@material-ui/core'

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Container>
            <Switch>
                <Route exact path="/">
                    <h1>Home page</h1>
                </Route>
                <Route exact path="/story/:storyId">
                    <StoryBoard />
                </Route>
            </Switch>
        </Container>
    </BrowserRouter>
)

export default App
