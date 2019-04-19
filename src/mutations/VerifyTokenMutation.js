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

const commit = (token, callback) => {
    const variables = {
        token
    }

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            if (errors) {
                // TODO: Better error handling
                callback(null)
                return
            }

            callback(response.verifyToken.payload)
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default { commit }
