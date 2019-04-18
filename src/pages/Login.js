import React from 'react'
import { useInput } from 'react-hanger'
import { navigate } from '@reach/router'
import FacebookLogin from 'react-facebook-login'
import LoginEmailUserMutation from '../mutations/LoginEmailUserMutation'
import LoginSocialUserMutation from '../mutations/LoginSocialUserMutation'
import { updateAuthState } from '../auth/authState'

const login = (...data) => {
    updateAuthState(...data)
    navigate('/')
}

const loginFacebook = response => {
    const accessToken = response.accessToken

    if (!accessToken) {
        console.log('Login failed')
        return
    }

    LoginSocialUserMutation.commit(accessToken, 'facebook', login)
}

export const Login = ({ login }) => {
    const email = useInput('')
    const password = useInput('')

    const loginEmail = () => {
        LoginEmailUserMutation.commit(email.value, password.value, login)
    }

    return (
        <div>
            <h4>{login ? 'Login' : 'Sign up'}</h4>
            <div>
                <input value={email.value} onChange={email.onChange} type="email" />
                <input value={password.value} onChange={password.onChange} type="password" />
            </div>
            <div>
                <button onClick={loginEmail}>{login ? 'Login' : 'Register'}</button>
            </div>
            <div>
                <FacebookLogin
                    appId="336267880205695"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={loginFacebook}
                />
            </div>
        </div>
    )
}
