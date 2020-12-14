import React from 'react';
import * as moneyloading from '../animations/moneyloading.json';
import * as transactionloading from '../animations/transaction.json';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import { FaRupeeSign } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
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
  Label,
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  //   chartExample1,
  chartExample2,
  colors,
  chartExample3,
} from 'variables/charts.js';

import Header from 'components/Headers/Header.js';

import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';
import axios from 'axios';
import Lottie from 'react-lottie';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: moneyloading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const transactionLoading = {
  loop: true,
  autoplay: true,
  animationData: transactionloading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

class DashboardPage extends React.Component {
  names = ['Priyav', 'Harsh', 'Rahul', 'Rishi', 'Vrutik'];
  //   userid = localStorage.getItem('userid');
  //   token = localStorage.getItem('Authorization');
  // profileName = this.props.location.state.name

  addTransaction = async () => {
    this.setState({ ...this.state, transactionLoader: true });
    let transaction = {
      amount: this.state.amount,
      description: this.state.description,
      type: this.state.type,
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
    };
    console.log(transaction);
    const res = await axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://rpk-expense-tracker.herokuapp.com/${sessionStorage.getItem(
          'userid'
        )}`,
        transaction,
        { headers: { Authorization: sessionStorage.getItem('Authorization') } }
      )
      .then((response) => {
        console.log(response);
        // this.assignData(response);
        setTimeout(() => {
          this.assignData(response);
        }, 0);
        this.setState({
          ...this.state,
          transactionLoader: false,
          amount: '',
          description: '',
          day: null,
          month: null,
          year: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1',
      isIncome: true,
      income: false,
      expense: false,
      loading: false,
      data: {},
      social_distance: [],
      mask_violations: [],
      card: [],
      showMore: false,
      showMore1: false,
      profileName: '',
      description: '',
      type: 'Income',
      amount: '',
      day: null,
      month: null,
      year: null,
      transactionLoader: false,
      expenseGraph: [],
      incomeGraph: [],
      chartExample1: {
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: '#FFFFFF',
                  zeroLineColor: '#FFFFFF',
                },
                ticks: {
                  callback: function (value) {
                    if (!(value % 10)) {
                      return 'Rs. ' + value;
                    }
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';

                if (data.datasets.length > 1) {
                  content += label;
                }

                content += 'Rs. ' + yLabel;
                return content;
              },
            },
          },
        },
        data1: (canvas) => {
          return {
            labels: this.state.graph_1_key,
            datasets: [
              {
                label: 'Performance',
                data: this.state.graph_1_value ? this.state.graph_1_value
                  : [0, 20, 40, 30, 15, 200, 20, 60, 60, 90, 160, 100],
              },
            ],
          };
        },
        data2: (canvas) => {
          return {
            labels: [
              'Jan',
              'Feb',
              'March',
              'April',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Performance',
                data: this.state.income
                  ? this.state.incomeGraph
                  : [0, 20, 40, 30, 15, 200, 20, 60, 60, 90, 160, 100],
              },
            ],
          };
        },
      },
      chartExample2: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    if (!(value % 10)) {
                      //return '$' + value + 'k'
                      return value;
                    }
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return content;
              },
            },
          },
        },
        data: {
          labels: [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29],
              maxBarThickness: 10,
            },
          ],
        },
      },

      chartExample3: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    if (!(value % 10)) {
                      //return '$' + value + 'k'
                      return value;
                    }
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return content;
              },
            },
          },
        },
        data: {
          labels: [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29],
              maxBarThickness: 10,
            },
          ],
        },
      },
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  async apiCall() {

    axios.all([
      axios.get('http://127.0.0.1:5000/location_details'),
      axios.get('http://127.0.0.1:5000/graph_details')
    ])
      .then(responseArr => {
        //this will be executed only when all requests are complete
        console.log('Loc ', (responseArr[0].data));
        this.setTableData(responseArr[0].data)
        // setGraphData(responseArr[1].data)
        // console.log('Graph ', responseArr[1].data);
        this.assignData(responseArr[1].data)
        this.setState({ ...this.state, loading: false });
      });
  }
  setTableData = (data) => {
    // console.log(data)
    let i = 0, j = 0
    let social = []
    let mask = []
    let card = []
    Object.keys(data).map(function (key, index) {

      // console.log(data[key].type)
      let entry = {}
      if (data[key].type === 'Social Distancing Violation') {
        i += 1
        entry = {
          'index': i,
          'date': data[key].date,
          'address': data[key].address,
          'imageURL': data[key].imageURL
        }
        social.push(entry)
      }
      else {
        j += 1
        entry = { 'index': j, 'date': data[key].date, 'address': data[key].address }
        mask.push(entry)

      }



    });
    card.push(i + j, i, j)
    console.log(mask)
    console.log(social)
    this.setState({
      ...this.state,
      social_distance: social,
      mask_violations: mask,
      card
    });


  }


  async componentDidMount() {
    this.setState({ ...this.state, loading: true });
    // const res = await axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/https://rpk-expense-tracker.herokuapp.com/dashboard/${sessionStorage.getItem(
    //       'userid'
    //     )}`,
    //     { headers: { Authorization: sessionStorage.getItem('Authorization') } }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     this.assignData(res);
    //   });
    this.apiCall()
  }

  assignData = (res) => {
    // res.graph_1_key
    // res.graph_1_value

    // console.log(savings);
    this.setState({
      ...this.state,
      // income: true,
      // expense: true,
      loading: false,
      // data: res.data,
      // expenses: res.data.transactions,
      // profileName: res.data.name,
      // expenseGraph: res.data.expensedf,
      // incomeGraph: res.data.incomedf,
      chartExample2: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {

                    return value;
                    //return value;

                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return content;
              },
            },
          },
        },
        data: {
          labels: res.graph_3_key,
          datasets: [
            {
              label: 'ALl Violations',
              //data: [25, 20, 30, 22, 17, 29],
              data: res.graph_3_value,
              maxBarThickness: 10,
            },
          ],
        },
      },

      chartExample3: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    return value;
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return content;
              },
            },
          },
        },
        data: {
          labels: res.graph_2_key,
          datasets: [
            {
              label: 'ALl Violations',
              //data: [25, 20, 30, 22, 17, 29],
              data: res.graph_2_value,
              maxBarThickness: 10,
            },
          ],
        },
      },

      chartExample1: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    return value;
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return content;
              },
            },
          },
        },
        data: {
          labels: res.graph_1_key,
          datasets: [
            {
              label: 'ALl Violations',
              //data: [25, 20, 30, 22, 17, 29],
              data: res.graph_1_value,
              maxBarThickness: 10,
            },
          ],
        },
      },
    });
  };
  toggleNavs = (e, index) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      activeNav: index,
      // chartExample1Data:
      //   this.state.chartExample1Data === 'data1' ? 'data2' : 'data1',
      chartExample1Data: index === 1 ? 'data1' : 'data2',
      income: index === 1 ? true : false,
    });

    console.log(this.state.income);
  };
  graphData(income) {
    if (income) {
      return this.incomeData;
    } else return this.expenseData;
  }
  downloadSheet() {
    window.open(
      'http://127.0.0.1:5000/csv'
    );
  }
  render() {
    if (this.state.loading) {
      // console.log(this.state.loginSuccess)
      return (
        <>
          <Lottie options={defaultOptions} height={500} width={500} />
        </>
      );
    }
    return (
      <>
        <div className='main-content' ref='mainContent'>

          <AdminNavbar
            {...this.props}
            brandText='Dashboard'
            // token={sessionStorage.getItem('Authorization')}
            name={this.state.profileName}

          />

          <Header
            monthly_savings={this.state.card[0]}
            income={this.state.card[2]}
            wallet={this.state.card[0]}
            expense={this.state.card[1]}
          />



          {/* Page content */}
          <Container className='mt--7' fluid>
            <Row>
              <Col className='mb-5 mb-xl-0' xl='4'>
                <Card className='bg-gradient-default shadow'>
                  <CardHeader className='bg-transparent'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h6 className='text-uppercase text-light ls-1 mb-1'>
                          Overview
                        </h6>
                        <h2 className='text-white mb-0'>Total Violations</h2>
                      </div>

                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className='chart'>
                      <Line
                        //data={this.graphData(this.state.income)}
                        data={this.state.chartExample1.data}
                        options={this.state.chartExample1.options}
                      // getDatasetAtEvent={e => console.log(e)}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xl='4'>
                <Card className='shadow'>
                  <CardHeader className='bg-transparent'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h6 className='text-uppercase text-muted ls-1 mb-1'>
                          Overview
                        </h6>
                        <h2 className='mb-0'>Social Distancing Violations</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className='chart'>
                      <Bar
                        data={this.state.chartExample2.data}
                        options={this.state.chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xl='4'>
                <Card className='shadow'>
                  <CardHeader className='bg-transparent'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h6 className='text-uppercase text-muted ls-1 mb-1'>
                          Overview
                        </h6>
                        <h2 className='mb-0'>Mask Defaulters</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className='chart'>
                      <Bar
                        data={this.state.chartExample3.data}
                        options={this.state.chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col Col xl='4'>
                <Card className='shadow'>
                  <CardHeader className='bg-transparent'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                        {this.state.isIncome == true ? (
                          <h2 className='mb-0'>Add Income</h2>
                        ) : (
                            <h2 className='mb-0'>Add Expense</h2>
                          )}
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart">
                      <Bar
                        data={chartExample2.data}
                        options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
            <Row>
              <Col>
                <Button
                  color='primary'
                  onClick={this.downloadSheet}
                  size='sm'
                  className='mt-3 '
                  style={{ float: 'right' }}
                >
                  Download CSV
                        </Button>


                {/* <Button
                  color='secondary'
                  onClick={this.apiCall}
                  size='sm'
                  className='mt-3'
                  style={{ float: 'right' }}
                >
                  Refresh
                        </Button> */}
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col className='mb-5 mb-xl-0' xl='6'>
                <Card className='shadow'>
                  <CardHeader className='border-0'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h3 className='mb-0'>Social Distancing Violations</h3>
                      </div>
                      <div className='col text-right'>

                        <Button
                          color='primary'
                          onClick={(e) => {
                            this.setState({
                              ...this.state,
                              showMore: !this.state.showMore,
                            });
                          }}
                          size='sm'
                        >
                          {this.state.showMore ? 'Show Less' : 'Show More'}
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Sr. No</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Location</th>


                      </tr>
                    </thead>
                    <tbody>
                      {this.state.social_distance && this.state.showMore
                        ? this.state.social_distance.map((expense) => (
                          <tr className="text-truncate" style={{ cursor: 'pointer' }} onClick={() => {
                            window.open(
                              expense.imageURL
                            );
                          }} >
                            {/* {expense.type == 'Income' ? (
                              <th scope='row' style={{ color: 'green' }}>
                                {expense.type}
                              </th>
                            ) : (
                                <th scope='row' style={{ color: 'red' }}>
                                  {expense.type}
                                </th>
                              )} */}
                            <td>{expense.index}</td>
                            <td>
                              {expense.date}
                            </td>
                            <td className="text-truncate" >

                              {expense.address}
                            </td>
                          </tr>
                        ))
                        : this.state.social_distance &&
                        this.state.social_distance.slice(0, 5).map((expense) => (
                          <tr className="text-truncate" style={{ cursor: 'pointer' }} onClick={() => {
                            window.open(
                              expense.imageURL
                            );
                          }} >
                            {/* {expense.type == 'Income' ? (
                              <th scope='row' style={{ color: 'green' }}>
                                {expense.type}
                              </th>
                            ) : (
                                <th scope='row' style={{ color: 'red' }}>
                                  {expense.type}
                                </th>
                              )} */}
                            <td>{expense.index}</td>
                            <td>
                              {expense.date}
                            </td>
                            <td className="text-truncate">

                              {expense.address}
                            </td>
                          </tr>
                        ))}
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
              <Col className='mb-5 mb-xl-0' xl='6'>
                <Card className='shadow'>
                  <CardHeader className='border-0'>
                    <Row className='align-items-center'>
                      <div className='col'>
                        <h3 className='mb-0'>Mask Defaulters</h3>
                      </div>
                      <div className='col text-right'>

                        <Button
                          color='primary'
                          onClick={(e) => {
                            this.setState({
                              ...this.state,
                              showMore1: !this.state.showMore1,
                            });
                          }}
                          size='sm'
                        >
                          {this.state.showMore1 ? 'Show Less' : 'Show More'}
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Type</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Date</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.mask_violations && this.state.showMore1
                        ? this.state.mask_violations.map((expense) => (
                          <tr style={{ cursor: 'pointer' }} onClick={() => {
                            window.open(
                              expense.imageURL
                            );
                          }}>

                            <td>{expense.index}</td>
                            <td>
                              {expense.date}
                            </td>
                            <td>

                              {expense.address}
                            </td>
                          </tr>
                        ))
                        : this.state.mask_violations &&
                        this.state.mask_violations.slice(0, 5).map((expense) => (
                          <tr style={{ cursor: 'pointer' }} onClick={() => {
                            window.open(
                              expense.imageURL
                            );
                          }}>

                            <td>{expense.index}</td>
                            <td>
                              {expense.date}
                            </td>
                            <td>

                              {expense.address}
                            </td>
                          </tr>
                        ))}
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
          </Container>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default DashboardPage;
