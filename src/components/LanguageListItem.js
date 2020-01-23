import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay/hooks'
import Link from '../routing/Link'

const languageListFragment = graphql`
  fragment LanguageListItemFragment on Language {
    name
    code
  }
`

const LanguageListItem = props => {
  const language = useFragment(languageListFragment, props.language)
  const { name, code } = language
  return (
    <li>
      <Link to={`/language/${code}`} title={name}>
        {name}
      </Link>
    </li>
  )
}

export default LanguageListItem
