import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import saveQuestion from '../utils/api.js'
import { handleAddQuestion } from '../actions/questions'
import { userNewQuestion } from '../actions/users'

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange = (e, selectedOption) => {
    const text = e.target.value

    this.setState(() => ({
      [selectedOption]: text,
    }))
  }

  handleSubmit = (e) => {
  e.preventDefault()

  const { optionOneText, optionTwoText } = this.state
  const { dispatch, authedUser, id } = this.props

  dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))

  this.setState(() => ({
    optionOneText: '',
    optionTwoText: '',
    toHome: id ? false : true,
  }))
}

  render () {
    const {optionOneText, optionTwoText, toHome} = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='new-question-card'>
        <h3 className='new-question-card__title'>Create a new question</h3>
        <div className='new-question'>
          <p>Complete the question</p>
          <h4>Would you rather...</h4>
          <input
            placeholder='option one'
            value={optionOneText}
            onChange={(e) => this.handleChange(e, 'optionOneText')}
            className='new-question__text-input'
          />
          <input
            placeholder='option two'
            value={optionTwoText}
            onChange={(e) => this.handleChange(e, 'optionTwoText')}
            className='new-question__text-input'
          />
          <button className='button-main-green'
            disabled={optionOneText === 'null' || this.optionTwoText === ''}
            onClick={(e) => this.handleSubmit(e)}>Submit Question
          </button>

        </div>
      </div>
    )
  }
}


export default connect()(NewQuestion)
