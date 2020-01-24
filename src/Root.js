import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import { usePreloadedQuery } from 'react-relay/hooks'
import ContinentListItem from './components/ContinentListItem'

const { Suspense } = React

export default function Root(props) {
  // Defines *what* data the component needs via a query. The responsibility of
  // actually fetching this data belongs to the route definition: it calls
  // preloadQuery() with the query and variables, and the result is passed
  // on props.prepared.issuesQuery - see src/routes.js
  const data = usePreloadedQuery(
    graphql`
      query RootContinentsQuery($showContinentCode: Boolean = false) {
        continents {
          ...ContinentListItemFragment
            @arguments(showContinentCode: $showContinentCode)
        }
      }
    `,
    props.prepared.rootQuery
  )
  const { continents } = data

  return (
    <div className="App">
      <h1>Continents</h1>
      <Suspense fallback="Loading...">
        <main>
          <ul>
            {continents.map((continent, idx) => (
              <ContinentListItem
                continent={continent}
                key={`continent_${idx}`}
              />
            ))}
          </ul>
        </main>
      </Suspense>
    </div>
  )
}
