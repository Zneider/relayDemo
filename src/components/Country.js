import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePreloadedQuery } from 'react-relay/hooks'
import GoBack from './GoBack'
import LanguageListItem from './LanguageListItem'

export const CountryQuery = graphql`
  query CountryQuery($code: String!) {
    country(code: $code) {
      code
      name
      native
      phone
      continent {
        name
      }
      currency
      languages {
        ...LanguageListItemFragment
      }
      emoji
      emojiU
    }
  }
`

const Languages = ({ languages }) => (
  <>
    <h3>Languages</h3>
    <ul>
      {languages.map((language, idx) => (
        <LanguageListItem
          language={language}
          key={`language_list_item_${idx}`}
        />
      ))}
    </ul>
  </>
)

const Country = props => {
  const data = usePreloadedQuery(CountryQuery, props.prepared.countryQuery)
  const {
    country: { name, native, phone, continent, currency, languages, emoji },
  } = data
  return (
    <>
      <GoBack />
      <h1>{name}</h1>
      <h2>Trivia</h2>
      <div>Native name: {native}</div>
      <div>Phone country code: {phone}</div>
      <div>Continent: {continent.name}</div>
      <div>Currency: {currency}</div>
      <div>Flag: {emoji}</div>
      <Languages languages={languages} />
    </>
  )
}

Country.displayname = 'Country'
export default Country
