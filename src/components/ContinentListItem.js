import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay/hooks'
import Link from '../routing/Link'

const continentListFragment = graphql`
  fragment ContinentListItemFragment on Continent
    @argumentDefinitions(
      showContinentCode: { type: "Boolean", defaultValue: true }
    ) {
    name
    code @include(if: $showContinentCode)
  }
`

const ContinentListItem = props => {
  const continent = useFragment(continentListFragment, props.continent)
  const { name, code } = continent
  return (
    <li>
      <Link to={`/continent/${code}`} title={name}>
        {name}
      </Link>
    </li>
  )
}

export default ContinentListItem
