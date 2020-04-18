import {Navbar, Nav, FormControl, Form, Button} from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {logout} from '../actions/authedUser'

class NavigationHeader extends Component {

  state = {

  }

  handleLogout = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(logout())
  }



  render () {
    return (
      <div className='header'>
      <h1 className='header__title--center'>Would You rather</h1>
        <Navbar bg="success" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home"><NavLink to='/' exact activeClassName='active'>Home</NavLink></Nav.Link>
            <Nav.Link href="#new"><NavLink to='/new' exact activeClassName='active'>New</NavLink></Nav.Link>
            <Nav.Link href="#leaderboard"><NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink></Nav.Link>
          </Nav>
          <Form inline>
            <div className='user-salutation'>Hello {this.props.authedUser}</div>
            <Button variant="outline-light" onClick={(e) => this.handleLogout(e)}>Logout</Button>
          </Form>
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NavigationHeader)
