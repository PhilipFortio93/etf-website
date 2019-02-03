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
import isotransferagent from './assets/img/isotransferagent.png';
import fundmanager from './assets/img/fundmanager2.png';
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
import StateZero from './assets/img/StateZero-Logo-Positive-HiRes.png';
import tom from './assets/img/tom.webp';
import phil from './assets/img/phil.webp';
import InvestmentAssociation from './assets/img/IA Fintech Member Landscape RGB.jpg';

import Footer from './components/Footer';
import scale from './assets/img/scale2.png';
import clearingHouse from "./assets/img/clearing-house.png";
import fundDistributor from "./assets/img/fund-distributor-2.png";
import fundAuditor from "./assets/img/fund-auditor.png";
import fundCustodian from "./assets/img/fund-custodian.png";
import fundEvaluator from "./assets/img/fund-evaluator.png";
import reconAgent from "./assets/img/recon-agent.png";
import registrar from "./assets/img/registrar.png";
import transferAgent from "./assets/img/transfer-agent-2.png";
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
                  <span style={{fontWeight: 700}}>The Global Transfer Agency Network</span>
                  <br/>
                </p>
                <p style={{color: "#031241"}}>
                  Become part of the network and lower your operating costs by 30%.<br/>
                </p>
                {
                //<br/>
                  //It all starts with a <Link to="/standard">standard</Link>
                //</p>
                }
                <Button
                  href="/#LearnMore"
                  >How do we do it?
                </Button>
              </Col>
              <Col md={6} xs={12}></Col>
            </Row>
          </Container>
        </header>
        <section id="Better">
        <Container>
          <p style={{fontSize: '21px'}}>
            We bring together fund management participants on a single network. No more reconciliations needed. Transparent data standardised and shared on a need to know basis making regulatory compliance easy. Scale globally as the network grows.
          </p>
        </Container>
          <Container>
            <Row>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundmanager} />
                  <p>Transparency over your end investor and an easy to scale network</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={transferAgent} />
                  <p>Increase STP and reduce manual processes. Focus on the value add services</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundDistributor} />
                  <p>Grow platform assets and offer investors simpler market access</p>
                </Card>
              </Col>
              <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
                <Card body className="custom-card">
                  <img className="img" src={fundCustodian} />
                  <p>Keep in Sync with Transfer Agents. Stay compliant with CSD Regulation</p>
                </Card>
              </Col>
            </Row>
            {
            //<Row>
            //  <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
            //    <Card body className="custom-card">
            //      <img className="img" src={fundCustodian} />
            //      <p>Safeguards the funds assets in a digitised form.</p>
            //    </Card>
            //  </Col>
            //  <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
            //    <Card body className="custom-card">
            //      <img className="img" src={fundAdministrator} />
            //      <p>Manages the accounts of the fund.</p>
            //    </Card>
            //  </Col>
            //  <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
            //    <Card body className="custom-card">
            //      <img className="img" src={fundEvaluator} />
            //      <p>Values the fund on a daily basis. Automatable.</p>
            //    </Card>
            //  </Col>
            //  <Col lg={3} md={6} xs={12} style={{padding: "20px"}}>
            //    <Card body className="custom-card">
            //      <img className="img" src={fundAuditor} />
            //      <p>Verifies the fund is regulatory compliant.</p>
            //    </Card>
            //  </Col>
            //</Row>
          }
          </Container>
        </section>
        <section
          id='Features'
          style={{paddingTop:"100px"}}>
          <br/>
          <Container style={{width: '100%'}}>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}}>Features</h2>
            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={three} style={{width: "100%"}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>1. Data Integrity</span>
                <p>
                  One single source of data, shared on a need to know basis. No more reconciliations or manual processes, 
                  all STP<br/>

                </p>
                <img src={web2} style={{width: "30%"}}/>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={three} style={{width: "100%"}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '50px'}}>
              <Col className='textCol' xs={12} md={6}>
                <span>2. Transparency</span>
                <p>
                  Complete transparency over your distributors and their performance.<br/>
                  Data at an investor level.<br/>
                  No more omnibus accounts at custodians or investment platforms.<br/>
            
                </p>
              </Col>
              <Col xs={12} md={6}>
                <img src={one} style={{width: "100%"}}/>
              </Col>
            </Row>

            <Row style={{marginBottom: '50px'}}>
              <Col xs={12} md={6} className="hide-phone">
                <img src={four} style={{width: "100%"}}/>
              </Col>
              <Col className='textCol' xs={12} md={6}>
                <span>3. Distribute with ease</span>
                <p>
                  Use Open Banking and Distributed Technology to allow direct investment. <br/>
                  All customer and regulatory checks automated by smart contracts.<br/>
                  One standardised API, easy to plug and play in any investment platform.<br/>
                </p>
                <img src={web2} style={{width: "30%"}}/>
              </Col>
              <Col xs={12} md={6} className="dont-hide-phone">
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
        <section id="Partners" style={{padding:"60px"}}>
        <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079", marginBottom:"50px"}}>Proud Members of</h2>
        <Container >
            <Row style={{margin: '40px'}}>
              <Col xs={12} md={6} >
                <img src={StateZero} style={{width: "80%"}}/>
              </Col>
              <Col xs={12} md={6} >
                <img src={InvestmentAssociation} style={{width: "50%"}}/>
              </Col>


            </Row>
        </Container>
        </section>

        <section id="LearnMore">
          <Container>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}}>
              Want to see a demo?
            </h2>
            <p>
              Send us a message and we'll show you how easy it is to become part of the future 
              of fund management

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
