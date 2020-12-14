/*!


*/
import React from 'react';
import Lottie from 'react-lottie';
import * as loginloading from '../../animations/loginloading.json';
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
  Col,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loginloading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPassword: '',
      loginUsername: '',
      loginSuccess: false,
      token: '',
      name: '',
      id: 0,
      loading: false,
    };
  }

  signInUser = async () => {
    this.setState({ ...this.state, loading: true });

    let user = {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    };

    console.log(user);
    // const res = await axios
    //   .post(
    //     'https://cors-anywhere.herokuapp.com/https://rpk-expense-tracker.herokuapp.com/login',
    //     user
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     sessionStorage.removeItem('Authorization');
    //     sessionStorage.removeItem('userid');
    //     sessionStorage.setItem(
    //       'Authorization',
    //       `Bearer ${response.data.access_token}`
    //     );
    //     sessionStorage.setItem('userid', response.data.id);
    //     setTimeout(() => {
    //       console.log('Delay');
    //       this.setState({
    //         ...this.state,
    //         token: `Bearer ${response.data.access_token}`,
    //         loginSuccess: true,
    //         name: response.data.name,
    //         id: response.data.id,
    //       });
    //     }, 4000);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setTimeout(() => {
      this.setState({
        ...this.state,
        name: this.state.loginUsername,
        loginSuccess: true,


      });
    }, 3500)
  };
  render() {
    if (this.state.loginSuccess) {
      console.log(this.state.loginSuccess);

      return (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: {
              access_token: this.state.token,
              name: this.state.name,
              id: this.state.id,
            },
          }}
        />
      );
    }

    return (
      <Col lg='5' md='7'>
        <Card className='bg-secondary shadow border-0'>
          {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
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
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <h4 className='lead font-weight-bold'>InOut Hack</h4>
            </div>
            <Form role='form'>
              <FormGroup className='mb-3'>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-circle-08' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Username'
                    type='text'
                    autoComplete='new-email'
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        loginUsername: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-lock-circle-open' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Password'
                    type='password'
                    autoComplete='new-password'
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        loginPassword: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
              <div className='text-center'>
                {!this.state.loading ? (
                  <Button
                    className='my-4'
                    color='primary'
                    type='button'
                    onClick={this.signInUser}
                    disabled={this.state.loading}
                  >
                    {' '}
                    Sign in
                  </Button>
                ) : (
                    <Lottie options={defaultOptions} height={175} width={175} />
                  )}
              </div>
            </Form>
            <Row>
              <Col className='text-center' xs='12'>
                <button
                  className='btn btn-link'
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <Link to='/register'>
                    <small>Create account</small>
                  </Link> */}
                </button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Login;
