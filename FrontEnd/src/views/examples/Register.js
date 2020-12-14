/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerUsername: '',
      registerPassword: '',
      registerSuccess: false
    };
  }

  createUser = async () => {
    let user = {
      username: this.state.registerUsername,
      name: this.state.registerName,
      password: this.state.registerPassword
    }


    console.log(user)
    const res = await axios.post('https://cors-anywhere.herokuapp.com/https://rpk-expense-tracker.herokuapp.com/register', user).then((response) => {
      console.log(response)
      this.setState({ ...this.state, registerSuccess: true })
    }).catch((err) => {
      console.log(err)
    })


  }

  render() {
    if (this.state.registerSuccess) {
      return <Redirect to='/login' />
    }

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h4 className='lead font-weight-bold'>Register</h4>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" onChange={(e) => {
                      this.setState({ ...this.state, registerName: e.target.value })

                    }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Username" type="email" autoComplete="new-email" onChange={(e) => {
                      this.setState({ ...this.state, registerUsername: e.target.value })

                    }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => {
                      this.setState({ ...this.state, registerPassword: e.target.value })

                    }} />
                  </InputGroup>
                </FormGroup>
                {/* <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div> */}
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      {/* <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label> */}
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-1" color="primary" type="button" onClick={this.createUser}>
                    Create account
                  </Button>
                </div>
              </Form>

              <Row className="mt-3">
                {/* <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col> */}

                <Col className="text-center" xs="12">

                  <button
                    className="btn btn-link"
                    onClick={e => e.preventDefault()}
                  >
                    <Link to='/login'><small>Sign in</small></Link>
                  </button>
                </Col>
              </Row>
            </CardBody>
          </Card>

        </Col>
      </>
    );
  }
}

export default Register;
