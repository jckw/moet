import React from 'react'
import { Link } from '@reach/router'
import { logout } from '../auth/authState'

const MetaBar = ({ user }) => {
    if (!user) {
        return (
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default MetaBar
