import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * COMPONENT
 */
const AuthForm = () => {
  return (
    <Container>
      <Row>
        <Col />
        <Col xs={6}>
          <div>
            <h2 id="login-title">Please sign in</h2>
          </div>
          <div id="googleAuth">
            <form method="get" action="/auth/google">
              <div>
                <Button type="submit" variant="primary" size="lg" block>
                  Login with Google
                </Button>
              </div>
            </form>
          </div>
          <div id="facebookAuth">
            <form method="get" action="/auth/facebook">
              <div>
                <Button type="submit" variant="secondary" size="lg" block>
                  Login with Facebook
                </Button>
              </div>
            </form>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
