import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from '../relay/environment'

const mutation = graphql`
    mutation VerifyTokenMutation($token: String!) {
        verifyToken(token: $token) {
            payload
        }
    }
`

const commit = token => {
    const variables = {
        token
    }

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            return !!response.payload
        },
        onError: err => {
            console.log(err)
            return false
        }
    })
}

export default { commit }
