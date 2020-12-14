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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { FaRupeeSign } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Login from "./examples/Login";
import AdminNavbar from '../components/Navbars/AdminNavbar'
import AdminFooter from '../components/Footers/AdminFooter'

class Index extends React.Component {

  names = ["Priyav", "Harsh", "Rahul", "Rishi", "Vrutik"];

  transactions = {
    data1 : {
      labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: [0, 20, 40, 30, 15, 200, 20, 60, 60, 90, 160, 100]
        }
      ]
    },
    data2 : {
      labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: [0, 40, 100, 80, 90, 50, 200, 40, 20, 10]
        }
      ]
    }
  }

  income = {
    labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Performance",
        data: [0, 20, 40, 30, 15, 200, 20, 60, 60, 90, 160, 100]
      }
    ]
  }

  expense = {
    labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Performance",
        data: [0, 40, 100, 80, 90, 50, 200, 40, 20, 10]
      }
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      isIncome: true,
      data : this.income
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    console.log(index);

    this.setState({
      ...this.state,
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
      data : index == 1 ? this.income : this.expense
    });

  };
  render() {
    console.log(this.state.chartExample1Data);
    console.log(this.transactions[this.state.chartExample1Data]);
    return (
      <>
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText="Dashboard"
            token={this.token}
          />
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                      </h6>
                        <h2 className="text-white mb-0">Transaction Analysis</h2>
                      </div>
                      <div className="col">
                        <Nav className="justify-content-end" pills>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: this.state.activeNav === 1
                              })}
                              href="#pablo"
                              //onClick={e => this.toggleNavs(e, 1)}
                              onClick = {e => {
                                e.preventDefault();

                                this.setState({
                                  ...this.state,
                                  activeNav: 1,
                                  chartExample1Data:
                                    this.state.chartExample1Data === "data1" ? "data2" : "data1",
                                  data : this.income
                                });
                              }}
                            >
                              <span className="d-none d-md-block">Income</span>
                              <span className="d-md-none">M</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: this.state.activeNav === 2
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              //onClick={e => this.toggleNavs(e, 2)}
                              onClick = {e => {
                                e.preventDefault();

                                this.setState({
                                  ...this.state,
                                  activeNav: 2,
                                  chartExample1Data:
                                    this.state.chartExample1Data === "data1" ? "data2" : "data1",
                                  data : this.expense
                                });
                              }}
                            >
                              <span className="d-none d-md-block">Expense</span>
                              <span className="d-md-none">W</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Line
                        //data={this.state.income === true ? this.incomeData : this.expenseData}
                        data={this.transactions[this.state.chartExample1Data]}
                        options={chartExample1.options}
                        getDatasetAtEvent={e => console.log(e)}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col Col xl="4" >
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6> */}
                        {this.state.isIncome == true ? (<h2 className="mb-0">Add Income</h2>) : (<h2 className="mb-0">Add Expense</h2>)}

                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>

                    {/* <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div> */}
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="ni ni-email-83" /> */}
                            <FaRupeeSign />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Amount" type="text" autoComplete="new-email" onChange={(e) => (console.log(e.target.value))} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="ni ni-lock-circle-open" /> */}
                            <CgNotes />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Description" type="text" autoComplete="new-password" />
                      </InputGroup>
                    </FormGroup>
                    <Row>
                      {/* <div className='ml-3'>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" value="Income" onChange={(e) => console.log(e.target.value)} />{' '}
                      Income
                    </Label>
                      </FormGroup>
                    </div>
                    <div className='ml-2'>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" value="Expense" onChange={(e) => console.log(e.target.value)} />{' '}
                       Expense
                    </Label>
                      </FormGroup>
                    </div> */}
                      <div class="custom-control custom-control-alternative custom-radio mb-3 ml-3">
                        <input name="custom-radio-2" class="custom-control-input" id="customRadio5" value="Income" type="radio" defaultChecked onChange={(e) => {
                          this.setState({ ...this.state, isIncome: true })
                          console.log(e.target.value)
                        }} />
                        <label class="custom-control-label" for="customRadio5">Income</label>
                      </div>
                      <div class="custom-control custom-control-alternative custom-radio ml-3">
                        <input name="custom-radio-2" class="custom-control-input" id="customRadio6" value="Expense" type="radio" onChange={(e) => {
                          this.setState({ ...this.state, isIncome: false })
                          console.log(e.target.value)
                        }} />
                        <label class="custom-control-label" for="customRadio6">Expense</label>
                      </div>
                    </Row>
                    <div class="form-group">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                        </div>
                        <input class="form-control text" placeholder="Select date" type="text" value="06/20/2020" />
                      </div>
                    </div>
                    {this.state.isIncome == true ? (<button class="btn btn-block btn-success">Add Income</button>) : (<button class="btn btn-block btn-danger">Add Expense</button>)}
                  </CardBody>
                </Card>
              </Col >
            </Row >
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Your Transactions</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          See all
                      </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.names.map(name => (
                          <tr>
                            <th scope="row">{name}</th>
                            <td>4,569</td>
                            <td>340</td>
                            <td>
                              <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            46,53%
                          </td>
                          </tr>
                        ))
                      }
                      {/* <tr>
                      <th scope="row">{this.names[0]}</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr> */}
                    </tbody>
                  </Table>
                </Card>
              </Col>
              {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> */}
            </Row>
          </Container >
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Index;
