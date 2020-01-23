import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePreloadedQuery } from 'react-relay/hooks'
import GoBack from './GoBack'

const LanguageQuery = graphql`
  query LanguageQuery($code: String!) {
    language(code: $code) {
      code
      name
      native
      rtl
    }
  }
`

const Language = props => {
  const { language } = usePreloadedQuery(
    LanguageQuery,
    props.prepared.languageQuery
  )
  const { name, native, rtl } = language
  return (
    <>
      <GoBack />
      <h1>{name}</h1>
      <div>native: {native}</div>
      {rtl && <div>rtl: {rtl}</div>}
    </>
  )
}

export default Language
