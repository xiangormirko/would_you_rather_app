import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'

class UserStats extends Component {


  render () {

    const { user } = this.props
    const answersCount = Object.keys(user.answers).length
    const questionsCount = user.questions.length
    const totalScore = answersCount + questionsCount

    return (
      <div  className='question-card'>
          <div className='question-card__header'><h4>{user.name}'s stats</h4></div>
          <div className='question-card__content'>
            <div className='question-card__content__avatar'>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='avatar'
              />
            </div>
            <div className='user-stats'>
              <div className='user-stats__score'>
                Answers provided: {answersCount}
              </div>
              <div className='user-stats__score'>
                Questions asked: {questionsCount}
              </div>

              <div className='user-stats__total-score'>
                <h2>Total score: {totalScore}</h2>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


export default connect()(UserStats)
