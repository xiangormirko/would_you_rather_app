import {DropdownButton, Dropdown} from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {

  state = {
    selectedUser: null,
  }

  handleChange = (e, id) => {
    this.setState(() => ({
      selectedUser: id,
    }))
  }

  handleLogin = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    const { selectedUser } = this.state

    dispatch(setAuthedUser(selectedUser))
  }

  render () {
    const {users} = this.props

    return (
      <div className='new-question-card'>
        <h3 className='new-question-card__title'>Welcome to the Would You Rather App!</h3>
        <div className='sign-in'>
          <h4 className='sign-in__title'>Please sign in to continue</h4>
            <div className="sign-in__drop-down">
              <DropdownButton id="dropdown-item-button" title={
                this.state.selectedUser !== null
                ? this.state.selectedUser
                : "Select user to impersonate"
              } variant='success'>
                {Object.keys(users).map((id) => (
                  <Dropdown.Item as="button" id={id} onClick={(e) => this.handleChange(e, id)}>{id}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          <button className='button-main-green'
            disabled={this.state.selectedUser === null}
            onClick={(e) => this.handleLogin(e)}>Log In
          </button>

        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    authedUser,
    users,
  }
}


export default connect(mapStateToProps)(SignIn)
