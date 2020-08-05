import React, { Component } from 'react'


type StoryState = {text: string}

class Story extends Component<any, StoryState> {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    componentDidMount() {
        fetch('/api/hello')
            .then(res => res.text())
            .then(text => this.setState({ text: text }))
    }

    render() {
        return <p>{this.state.text}</p>
    }
}

export default Story
