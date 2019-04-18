import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from '../relay/environment'

const mutation = graphql`
    mutation LoginEmailUserMutation($email: String!, $password: String!) {
        emailAuth(email: $email, password: $password) {
            token
        }
    }
`

const commit = (email, password, callback) => {
    const variables = {
        email,
        password
    }

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            const token = response.emailAuth.token
            callback(token)
        },
        onError: err => console.log(err)
    })
}

export default { commit }
