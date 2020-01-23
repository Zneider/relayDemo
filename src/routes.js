import JSResource from './JSResource'
import { preloadQuery } from 'react-relay/hooks'
import RelayEnvironment from './relay/relayEnvironment'

const routes = [
  {
    path: '/',
    exact: true,
    component: JSResource('Root', () => import('./Root')),
    prepare: params => {
      const RootQuery = require('./__generated__/RootContinentsQuery.graphql')
      return {
        rootQuery: preloadQuery(
          RelayEnvironment,
          RootQuery,
          {
            // owner: 'facebook',
            // name: 'relay',
          },
          // The fetchPolicy allows us to specify whether to render from cached
          // data if possible (store-or-network) or only fetch from network
          // (network-only).
          { fetchPolicy: 'store-or-network' }
        ),
      }
    },
  },
  {
    path: '/continent/:code',
    /**
     * A lazy reference to the component for the home route. Note that we intentionally don't
     * use React.lazy here: that would start loading the component only when it's rendered.
     * By using a custom alternative we can start loading the code instantly. This is
     * especially useful with nested routes, where React.lazy would not fetch the
     * component until its parents code/data had loaded. Nested route support isn't
     * implemented in our mini-router yet, but one can imagine iterating over all
     * the matched route entries and calling .load() on each of their components.
     */
    component: JSResource('Continent', () => import('./components/Continent')),
    /**
     * A function to prepare the data for the `component` in parallel with loading
     * that component code. The actual data to fetch is defined by the component
     * itself - here we just reference a description of the data - the generated
     * query.
     */
    prepare: params => {
      const ContinentQuery = require('./components/__generated__/ContinentQuery.graphql')
      return {
        continentQuery: preloadQuery(
          RelayEnvironment,
          ContinentQuery,
          {
            code: params.code,
          },
          // The fetchPolicy allows us to specify whether to render from cached
          // data if possible (store-or-network) or only fetch from network
          // (network-only).
          { fetchPolicy: 'store-or-network' }
        ),
      }
    },
  },
  {
    path: '/country/:code',
    component: JSResource('Country', () => import('./components/Country')),
    prepare: params => {
      const CountryQuery = require('./components/__generated__/CountryQuery.graphql')
      return {
        countryQuery: preloadQuery(
          RelayEnvironment,
          CountryQuery,
          {
            code: params.code,
          },
          { fetchPolicy: 'store-or-network' }
        ),
      }
    },
  },
  {
    path: '/language/:code',
    component: JSResource('Language', () => import('./components/Language')),
    prepare: params => {
      const LanguageQuery = require('./components/__generated__/LanguageQuery.graphql')
      return {
        languageQuery: preloadQuery(
          RelayEnvironment,
          LanguageQuery,
          {
            code: params.code,
          },
          { fetchPolicy: 'store-or-network' }
        ),
      }
    },
  },
]

export default routes
