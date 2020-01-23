import React from 'react'
import RoutingContext from '../routing/RoutingContext'

const GoBack = props => {
  const { history } = React.useContext(RoutingContext)
  return history && <button onClick={() => history.goBack()}>Tilbage</button>
}

export default GoBack
