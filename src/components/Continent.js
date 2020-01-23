import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePreloadedQuery } from 'react-relay/hooks'
// import Link from '../routing/Link'
import GoBack from './GoBack'
import CountryListItem from './CountryListItem'

export const ContinentQuery = graphql`
  query ContinentQuery($code: String!) {
    continent(code: $code) {
      code
      name
      countries {
        ...CountryListItemFragment
      }
    }
  }
`

type Props = {
  code: string,
}

const Continent = (props: Props) => {
  const data = usePreloadedQuery(ContinentQuery, props.prepared.continentQuery)

  const {
    continent: { name, countries },
  } = data

  return (
    <>
      <GoBack />
      <h1>{name}</h1>
      <h2>Countries ({countries.length})</h2>
      <ul>
        {countries.map((country, idx) => {
          return (
            <CountryListItem
              country={country}
              key={`country_list_item_${idx}`}
            />
          )
        })}
      </ul>
    </>
  )
}

export default Continent
