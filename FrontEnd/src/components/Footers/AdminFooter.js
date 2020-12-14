import React from 'react';
import { GoLogoGithub } from 'react-icons/go';
import { FaGithub } from 'react-icons/fa';
// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <footer className='footer'>
        <Row className='align-items-center justify-content-xl-between'>
          <Col xl='6'>
            <div className='copyright text-center text-xl-left text-muted h3'>
              InOut Hack
            </div>
          </Col>

          <Col xl='6'>
            <Nav className='nav-footer justify-content-center justify-content-xl-end'>
              <NavItem>
                <FaGithub size='2em' />
              </NavItem>
              <NavItem>
                <NavLink
                  href='https://github.com/rishikaul22'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Rishi Kaul
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href='https://github.com/khushijashnani'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Khushi Jashnani
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href='https://github.com/priyavmehta'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Priyav Mehta
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href='https://github.com/toshnaik'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Ashutosh Naik
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
