import React, { Component } from 'react'
import { css } from '@emotion/core'

type StoryState = { text: string }

class Story extends Component<any, StoryState> {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    componentDidMount() {
        fetch('/api/hello')
            .then(res => res.json())
            .then(json => this.setState({ text: json.text }))
    }

    render() {
        return (
            <p
                css={css`
                    color: red;
                `}
            >
                {this.state.text}
            </p>
        )
    }
}

export default Story
