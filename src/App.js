import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import store from 'store'
import observePlugin from 'store/plugins/observe'
import jwtDecode from 'jwt-decode'

import { Login } from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header'
import { UserContext, onAuthStateChange } from './auth/authState'

store.addPlugin(observePlugin)

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(
        onAuthStateChange((token, oldToken) => {
            if (token) {
                setUser(jwtDecode(token))
            } else {
                setUser(null)
            }
        }),
        []
    )

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header />
                <Router>
                    <Home path="/" />
                    <Login path="/login" login />
                    <Login path="/signup" login={false} />
                </Router>
            </div>
        </UserContext.Provider>
    )
}

export default App
