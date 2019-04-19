import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import store from 'store'
import { JWT_AUTH_TOKEN } from '../constants'

const RELAY_ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? 'https://example.com/graphql'
        : 'http://localhost:8000/graphql'

function fetchQuery(operation, variables, cacheConfig, uploadables) {
    const authToken = store.get(JWT_AUTH_TOKEN)
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
const relay_store = new Store(new RecordSource())

const environment = new Environment({
    network,
    store: relay_store
})

export default environment
