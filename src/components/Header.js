import React, { Component } from "react";
import { db } from "../api/firebase";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      referrals: 0
    };
  }

  componentDidMount() {
    // FLAG
    // we call a function to start listening to the one value we want
    this.getReferrals();
  }

  getReferrals = () => {
    // FLAG
    // .onSnapshot will listen and update when the value updates
    // https://firebase.google.com/docs/firestore/query-data/listen
    db.collection(`referrals`)
      .doc("one")
      .onSnapshot(doc => {
        this.setState({ referrals: doc.data().count });
      });
  };

  increaseByOne = () => {
    // FLAG
    // use a transaction to keep the value in sync
    // this will read the value before updating it
    // Important when many people using your app to read the value before you update it
    // https://firebase.google.com/docs/firestore/manage-data/transactions
    const referralsRef = db.collection(`referrals`).doc("one");
    return db.runTransaction(transaction => {
      return transaction.get(referralsRef).then(currentReferral => {
        const newValue = currentReferral.data().count + 1;
        transaction.update(referralsRef, { count: newValue });
      });
    });
  };

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Referals
                          </CardTitle>

                          <span className="h2 font-weight-bold mb-0">
                            {this.state.referrals}
                          </span>
                        </div>
                        <Button onClick={this.increaseByOne}>
                          Increase by one
                        </Button>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" />
                        </span>{" "}
                        <span className="text-nowrap">Total Referals</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Status
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.Status}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="ni ni-badge" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-down" />
                        </span>{" "}
                        <span className="text-nowrap">Active Users</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Earnings
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            ‎₦{this.state.earnings}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {" "}
                        <span className="text-nowrap">
                          From Active Referrals
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
