import React, { Component } from 'react';
import board from './assets/img/board.svg';
import safe from './assets/img/safe.svg';
import key from './assets/img/key.svg';
import './App.css';
import Nav from './components/Nav';
import { Container, Row, Col, Card, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from './components/Button';
import { Player } from 'video-react';
import one from './assets/img/one.png';
import two from './assets/img/two.png';
import three from './assets/img/three.png';
import four from './assets/img/four.png';
import web from './assets/img/web.png';
import web2 from './assets/img/web2.png';
import chooseToken from './assets/img/chooseToken.webp';
import buyAlongside from './assets/img/buyAlongside.webp';
import forgetMiddlemen from './assets/img/forgetMiddlemen.webp';
import regulated from './assets/img/regulated.webp';
import savvy from './assets/img/savvy.webp';
import HubspotForm from 'react-hubspot-form';

import tom from './assets/img/tom.webp';
import phil from './assets/img/phil.webp';

import Footer from './components/Footer';
import scale from './assets/img/scale2.png';
import clearingHouse from "./assets/img/clearing-house.png";
import fundAdministrator from "./assets/img/fund-administrator.png";
import fundAuditor from "./assets/img/fund-auditor.png";
import fundCustodian from "./assets/img/fund-custodian.png";
import fundEvaluator from "./assets/img/fund-evaluator.png";
import reconAgent from "./assets/img/recon-agent.png";
import registrar from "./assets/img/registrar.png";
import transferAgent from "./assets/img/transfer-agent.png";
import Vimeo from 'react-vimeo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav {...this.props} />
        <header className="App-header">
          <div class="image">
            <img src={scale} />
          </div>
          <Container>
            <Row>
              <Col lg={6} xs={12}>
                <h1>
                  TokenBlocks
                </h1>
                <h2>
                  21st Century <span style={{fontWeight: 900}}>Fund Managment</span>
                </h2>
                <p>
                  <span style={{fontWeight: 700}}>The standard for Fund Backed tokens</span>
                  <br/>
                </p>
                <p style={{color: "#031241"}}>
                  Use one ledger across the whole lifecycle of your fund.<br/>
                  Reduce operational risk, reconciliations and fee layering.<br/>
                <br/>
                  It all starts with a <Link to="/standard">standard</Link>
                </p>
              </Col>
              <Col md={6} xs={12}></Col>
            </Row>
          </Container>
        </header>
        <section id="Better">
          <p style={{fontSize: '21px'}}>
            We’ve taken all the best Distributed Ledger Technology (DLT) bits and stuck them in one platform.
          </p>
          <p style={{fontSize: '21px'}}>
          Internalise services and compete with the biggest issuers on the street.
          </p>
          <Container>
            <Row>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={transferAgent} />
                  <p>Processes the creation and deletion of new fund units. Perfect DLT application.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={registrar} />
                  <p>Maintains the list of fund holders. Sounds like a ledger.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={reconAgent} />
                  <p>Ensures everyone is in agreement about the state of any trades. Inherent in DLT.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={clearingHouse} />
                  <p>A trusted third-party to match trades and settle cash. Definitely DLT-able.</p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundCustodian} />
                  <p>Safeguards the funds assets in a digitised form.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundAdministrator} />
                  <p>Manages the accounts of the fund.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundEvaluator} />
                  <p>Values the fund on a daily basis. Automatable.</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundAuditor} />
                  <p>Verifies the fund is regulatory compliant.</p>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          id='Features'
          style={{paddingTop:"180px"}}
          >
          <Container style={{width: '100%'}}>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}}>Features</h2>
            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={one} style={{width: "100%",}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>1. Really know your customer</span>
                <p>
                  Data at an investor level.<br/>
                  No more omnibus accounts at custodians or investment platforms.<br/>
                  Understand who loves your product, who doesn’t and why.
                </p>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={one} style={{width: "100%",}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col className='textCol' xs={12} md={6}>
                <span>2. Compete with scale</span>
                <p>
                  Internalise fund management functions at a fraction of the cost and scale. <br/>
                  Compete with the largest players from day 1.
                </p>
              </Col>
              <Col xs={12} md={6}>
                <img src={two} style={{width: "100%"}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={three} style={{width: "100%"}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>3. Best in class funds</span>
                <p>
                  Bring down your fund running costs and give investors what they deserve.<br/>
                  Best in class funds.
                </p>
                <img src={web2} style={{width: "30%"}}/>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={three} style={{width: "100%"}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col className='textCol' xs={12} md={6}>
                <span>4. Distribute with ease</span>
                <p>
                  One standardised API, easy to plug and play in any investment platform.<br/>
                  All customer and compliance checks done by the blockchain.<br/>
                  Reach thousands of investors instantly and distribute with peace of mind
                </p>
                <img src={web} style={{width: "80%"}} className="hide-phone"/>
              </Col>
              <Col xs={12} md={6}>
                <img src={four} style={{width: "100%"}}/>
              </Col>
            </Row>
          </Container>
        </section>
        {
          // <section id="Team">
          //   <Container>
          //     <h2 style={{fontWeight: 700, fontSize: '44px', marginBottom: '90px'}}>Team</h2>
          //     <Row>
          //       <Col md={6} xs={12} style={{padding: "20px"}}>
          //         <Card body className="custom-card">
          //           <img src={phil} style={{width: '140px', margin: 'auto', borderRadius: '500px'}}/>
          //           <h5>Phil Fortio</h5>
          //           <p>3 years of ETF trading at Barclays Capital.</p>
          //           <p>Theoretical Physics degree from Imperial College London.</p>
          //         </Card>
          //       </Col>
          //       <Col md={6} xs={12} style={{padding: "20px"}}>
          //         <Card body className="custom-card">
          //           <img src={tom} style={{width: '140px', margin: 'auto', borderRadius: '500px'}}/>
          //           <h5>Tom Murray</h5>
          //           <p>Multiple start-up ventures on both Techstars and Ignite.</p>
          //           <p>Computer Science degree from Imperial College London.</p>
          //         </Card>
          //       </Col>
          //     </Row>
          //   </Container>
          // </section>
        }
        <section id="LearnMore">
          <Container>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}}>
              Want to see a demo?
            </h2>
            <p>
              Enter you details below to view our demo video

            </p>
            <br/>
            <Row>
              <Col
                md={{ size: 8, offset: 2 }}
                xs="12"
                >
                <HubspotForm
                  portalId='5065524'
                  formId='c9561c3f-4055-4603-b3c9-0d21bb13977e'
                  onSubmit={() => console.log('Submit!')}
                  onReady={(form) => console.log('Form ready!')}
                  loading={<div>Loading...</div>}
                />
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
