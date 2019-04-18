import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from '../relay/environment'

const mutation = graphql`
    mutation LoginSocialUserMutation($accessToken: String!, $provider: String!) {
        socialAuth(accessToken: $accessToken, provider: $provider) {
            token
        }
    }
`

const commit = (accessToken, provider, callback) => {
    const variables = {
        accessToken,
        provider
    }

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            const token = response.socialAuth.token
            callback(token)
        },
        onError: err => console.log(err)
    })
}

export default { commit }
