import React from 'react'
import { UserContext } from '../auth/authState'
import MetaBar from './MetaBar'

const Header = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Moet</h3>
        <UserContext.Consumer>{user => <MetaBar user={user} />}</UserContext.Consumer>
    </div>
)

export default Header
