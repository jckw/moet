import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Login } from './pages/Login'
import Home from './pages/Home'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Home path="/" />
                    <Login path="/login" login />
                    <Login path="/signup" login={false} />
                </Router>
            </div>
        )
    }
}

export default App
