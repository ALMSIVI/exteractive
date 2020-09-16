import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StoryBoard from '../features/stories/StoryBoard'
import StoryList from '../features/stories/StoryList'
import AddStoryForm from '../features/stories/AddStoryForm'
import EditStoryForm from '../features/stories/EditStoryForm'
import UsersList from '../features/users/UsersList'
import UserPage from '../features/users/UserPage'
import NotificationsList from '../features/notifications/NotificationsList'
import Navbar from './Navbar'
import { Container } from '@material-ui/core'

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Container>
            <Switch>
                <Route exact path="/">
                    <Fragment>
                        <StoryList />
                        <AddStoryForm />
                    </Fragment>
                </Route>
                <Route exact path="/story/:storyId">
                    <StoryBoard />
                </Route>
                <Route exact path="/story/edit/:storyId">
                    <EditStoryForm />
                </Route>
                <Route exact path="/users">
                    <UsersList />
                </Route>
                <Route exact path="/users/:userId">
                    <UserPage />
                </Route>
                <Route exact path="/notifications">
                    <NotificationsList />
                </Route>
            </Switch>
        </Container>
    </BrowserRouter>
)

export default App
