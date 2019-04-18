import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { JWT_AUTH_TOKEN } from '../constants'

const RELAY_ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? 'https://example.com/graphql'
        : 'http://localhost:8000/graphql'

async function fetchQuery(operation, variables, cacheConfig, uploadables) {
    const authToken = await localStorage.getItem(JWT_AUTH_TOKEN)
    const authHeader = authToken ? { Authorization: `JWT ${authToken}` } : {}

    return fetch(RELAY_ENDPOINT, {
        method: 'POST',
        headers: {
            // Add authentication and other headers here
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...authHeader
        },
        body: JSON.stringify({
            query: operation.text, // GraphQL text from input
            variables
        })
    }).then(response => {
        return response.json()
    })
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)
const store = new Store(new RecordSource())

const environment = new Environment({
    network,
    store
})

export default environment
