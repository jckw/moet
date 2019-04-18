import VerifyTokenMutation from '../mutations/VerifyTokenMutation'
import { JWT_AUTH_TOKEN } from '../constants'

export const updateAuthState = token => {
    if (token) {
        localStorage.setItem(JWT_AUTH_TOKEN, token)
    } else {
        localStorage.removeItem(JWT_AUTH_TOKEN)
    }
}

export const checkAuthState = async () => {
    const token = localStorage.getItem(JWT_AUTH_TOKEN)

    if (!token) {
        return
    }

    const valid = await VerifyTokenMutation.commit(token)

    if (!valid) {
        updateAuthState(null)
    }
}
