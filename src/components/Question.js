import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PollingView from './PollingView'
import { formatQuestion } from '../utils/_DATA.js'
import { NavLink, withRouter } from 'react-router-dom'


class Question extends Component {

  toTweetPage = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }

  viewOnly = (id) => {
    return (
      <Fragment>
      <div className='question-card__content__choices--1'>
        {this.props.question.optionOne.text}
      </div>
      <div className='question-card__content__choices--2'>
        {this.props.question.optionTwo.text}
      </div>
      <button className='button-main-green' onClick={(e) => this.toTweetPage(e, id)}>View Poll</button>
      </Fragment>
    )
  }

  render () {
    const { question, author, id } = this.props

    const {
      name, avatarURL
    } = author

    return (
      <div  className='question-card'>
          <div className='question-card__header'><h4>{name} asks Would you rather...</h4></div>
          <div className='question-card__content'>
            <div className='question-card__content__avatar'>
              <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className='avatar'
              />
            </div>
            <div className='question-card__content__choices'>
              {
                this.props.polling == true
                ? <PollingView id = {this.props.id} polling = {true} voted = {this.props.voted}/>
                : <div className='view-only-content'>{this.viewOnly(id)}</div>
              }

            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  const author = users[question.author]

  return {
    authedUser,
    author,
    question: question
  }
}

export default withRouter(connect(mapStateToProps)(Question))
