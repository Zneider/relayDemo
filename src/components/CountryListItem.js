import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay/hooks'
import Link from '../routing/Link'

const countryListFragment = graphql`
  fragment CountryListItemFragment on Country {
    name
    code
    emoji
  }
`

const CountryListItem = props => {
  const country = useFragment(countryListFragment, props.country)
  const { name, code, emoji } = country
  return (
    <li data-emoji={emoji} className="countryItem">
      <Link to={`/country/${code}`} title={name}>
        {name}
      </Link>
    </li>
  )
}

export default CountryListItem
