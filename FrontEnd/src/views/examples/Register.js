/*!

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
      email: this.state.registerUsername,
      organisation_name: this.state.registerName,
      password: this.state.registerPassword
    }


    console.log(user)
    const res = await axios.post('https://aprk-detector.herokuapp.com/register', user).then((response) => {
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
                    <Input placeholder="Organisation Name" type="text" onChange={(e) => {
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
                    <Input placeholder="E-mail" type="email" autoComplete="new-email" onChange={(e) => {
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
