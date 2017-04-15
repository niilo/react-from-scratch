import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import Battle from './Battle'
import Popular from './Popular'
require('../styles.css')

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route
              render={() => {
                return <p>Not found</p>
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
