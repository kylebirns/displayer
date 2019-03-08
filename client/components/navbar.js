import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>DISPLAYER</h1>
    <nav>
      {isLoggedIn && (
        <div>
          {/* The navbar will show these links after you log in */}
          <Container>
            <Row>
              <Col />
              <Col xs={6} />
              <Col>
                <Nav.Item>
                  <Nav.Link id="logout" variant="primary" onClick={handleClick}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
