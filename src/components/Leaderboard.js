import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import UserStats from './UserStats'

class Leaderboard extends Component {

  state = {

  }

  render () {

    const {users, userIds} = this.props

    return (

      <div>
        <div className='list-container'>
          <ul className='dashboard-list'>
            {userIds.map((id) => (
              <li key={id}>
                  <UserStats user={users[id]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {

  return {
    questions,
    authedUser,
    users,
    userIds: Object.keys(users)
      .sort((a, b) => ((users[b].questions.length + Object.keys(users[b].answers).length)
       - (users[a].questions.length + Object.keys(users[a].answers).length)))
  }
}

export default connect(mapStateToProps)(Leaderboard)
