import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GetMatches } from '../components/Fantasy-WL/getMatches'
import { GetMatch } from '../components/Fantasy-WL/getMatch'
import { Login } from '../components/Fantasy-WL/Login'

function Routes({client}) {
  return (
    <Router>
      <Switch>
        <Route path='/' render={(props) => <Login client={client} {...props} />} exact />
        <Route path='/getmatches' render={(props) => <GetMatches client={client} {...props} />} exact></Route>
        <Route path='/getmatch' render={(props) => <GetMatch client={client} {...props} />} exact></Route>
      </Switch>
    </Router>
  )
}

Routes.propTypes = {

}

export default Routes

