import React from 'react'
import './App.css'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import RelayEnvironment from './relay/relayEnvironment'
import createRouter from './routing/createRouter'
import RouterRenderer from './routing/RouteRenderer'
import RoutingContext from './routing/RoutingContext'
import routes from './routes'

// Uses the custom router setup to define a router instanace that we can pass through context
const router = createRouter(routes)

function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RoutingContext.Provider value={router.context}>
        {/* Render the active route */}
        <RouterRenderer />
      </RoutingContext.Provider>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
