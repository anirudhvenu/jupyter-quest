
import React, { Component } from 'react'

class CorseDetail extends Component {
    render() {
        return (
            <div>
                <h2>Welcome {this.props.match.params.id}</h2>
            </div>
        )
    }
}

export default CorseDetail