import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
export class loader extends Component {
    render() {
        return (
            <div className="loader-container">
                <div className="loader-body">
                    <CircularProgress className="load" />
                </div>
            </div>
        )
    }
}

export default loader
