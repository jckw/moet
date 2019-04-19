import React from 'react'
import store from 'store'
import VerifyTokenMutation from '../mutations/VerifyTokenMutation'
import { JWT_AUTH_TOKEN } from '../constants'

export const UserContext = React.createContext(null)

export const updateAuthState = token => {
    if (token) {
        store.set(JWT_AUTH_TOKEN, token)
    } else {
        store.remove(JWT_AUTH_TOKEN)
    }
}

export const checkAuthState = async () => {
    const token = store.get(JWT_AUTH_TOKEN)

    if (!token) {
        return
    }

    await VerifyTokenMutation.commit(token, payload => {
        if (!payload) {
            updateAuthState(null)
        }
    })
}

export const logout = () => {
    updateAuthState(null)
}

export const onAuthStateChange = callback => () => {
    async function setup() {
        await checkAuthState()

        store.observe(JWT_AUTH_TOKEN, (token, oldToken) => {
            callback(token, oldToken)
        })
    }
    setup()

    return function cleanup() {
        store.unobserve(JWT_AUTH_TOKEN)
    }
}
