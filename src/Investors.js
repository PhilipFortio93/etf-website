import React from 'react';
import board from './assets/img/board.svg';
import safe from './assets/img/safe.svg';
import key from './assets/img/key.svg';
import './App.css';
import Nav from './components/Nav';
import { Container, Row, Col, Card, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
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
import savvy from './assets/img/savvy.png';
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

export default class Investors extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="App">
        <Nav {...this.props} />
        <header className="App-header">
          <div class="image">
            <img src={savvy} />
          </div>
          <Container>
            <Row>
              <Col lg={6} xs={12}>
                <h1>
                  TokenBlocks
                </h1>
                <h2>
                  21st Century <span style={{fontWeight: 900}}>Investing</span>
                </h2>
                <p style={{color: "#031241"}}>
                  Digital Shares are the new way to gain access to funds,
                  traded on a distributed ledger with no transaction fees and
                  yet all the investor protection of a traditional fund.
                </p>
                <p>
                  Sign up to receive alpha access to our simulation platform.
                  <HubspotForm
                    portalId='5065524'
                    formId='7ce390b8-8482-4d05-92b2-34aa6abd780b'
                    onSubmit={() => console.log('Submit!')}
                    onReady={(form) => console.log('Form ready!')}
                    loading={<div>Loading...</div>}
                  />
                </p>
              </Col>
              <Col md={6} xs={12}></Col>
            </Row>
          </Container>
        </header>
        <section
          id='Features'
          style={{paddingTop:"180px"}}
          >
          <Container style={{width: '100%'}}>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}}>Features</h2>
            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={forgetMiddlemen} style={{width: "100%",}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>1. No Platform Transaction Fees</span>
                <p>
                  Digital shares of funds we work with use a single distributed ledger to transfer ownership. <br/>
                  No middle man means no fees - bam.
                </p>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={forgetMiddlemen} style={{width: "100%",}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col className='textCol' xs={12} md={6}>
                <span>2. Same Funds, Same Protection, Better Performance</span>
                <p>
                  Our technology reduces the management costs of the fund. <br/>
                  Same fund, different share class, better performance. <br/>
                  Exchange your shares for cash and vice versa just like any other traditional fund.
                </p>
              </Col>
              <Col xs={12} md={6}>
                <img src={regulated} style={{width: "100%"}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={buyAlongside} style={{width: "100%"}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>3. Mates Rates - Trade digital shares directly with your mates, no spreads</span>
                <p>
                  Finally an easily accessible secondary market for mutual funds. <br/>
                  Trade whenever with whoever.
                </p>
                <img src={web2} style={{width: "30%"}}/>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={buyAlongside} style={{width: "100%"}}/>
              </Col>
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <Col className='textCol' xs={12} md={6}>
                <span>4. Social Empowerment </span>
                <p>
                  Investing is as necessary as life insurance especially with the impending pension deficit. <br/>
                  Learn how to be a savvy investor and future proof your retirement
                </p>
                <img src={web} style={{width: "80%"}} className="hide-phone"/>
              </Col>
              <Col xs={12} md={6}>
                <img src={chooseToken} style={{width: "100%"}}/>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    )
  }
}
