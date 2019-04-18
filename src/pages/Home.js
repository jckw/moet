import React from 'react'
import { Link } from '@reach/router'

const Home = () => {
    return (
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">Sign up</Link>
            </li>
        </ul>
    )
}

export default Home
