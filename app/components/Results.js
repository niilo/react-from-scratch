import React, { Component } from 'react'
import { battle } from '../utils/api'

class Results extends Component {
  constructor (props) {
    super(props)
    battle(['niilo', 'niilo']).then(data => {
      console.log(data)
    })
  }
  render () {
    return (
      <div>
        Results
      </div>
    )
  }
}

export default Results
