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
import investorimage from './assets/img/investor-data-1.png';
import investorimagetwo from './assets/img/investor-data-2.png';
import investorimagethree from './assets/img/investor-data-3.png';
import investorimagefour from './assets/img/investor-data-4.png';
import investorimagefive from './assets/img/investor-data-5.png';
import investorimagesix from './assets/img/investor-data-6.png';
import investorimageseven from './assets/img/investor-data-7.png';
import investorimageeight from './assets/img/investor-data-8.png';
import investorimagenine from './assets/img/investor-data-9.png';
import investorimageten from './assets/img/investor-data-10.png';
import investorimage13 from './assets/img/investor-data-13.png';
import investorimage14 from './assets/img/investor-data-14.png';
import productstop from './assets/img/products-top.png';

import tradedata from './assets/img/trade-data-1.png';
import tradedatatwo from './assets/img/trade-data-3.png';
import tradedata4 from './assets/img/trade-data-4.png';

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

export default class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="App" >
        <Nav {...this.props} />
        <header className="App-header" style={{"min-height":"60vh"}}>
        <Col md={9} xs={12}>
          <Container>
            <Row style={{"align-items":'center', display:'flex'}}>
              <Col lg={8} xs={12} >
                <h1>
                  Solutions
                </h1>
                <h2>
                <span style={{fontWeight: 900}}>Investor Data </span> Management
                </h2>
                <h2>
                <span style={{fontWeight: 900}}>Order Flow </span> Management
                </h2>
          <p style={{fontSize: '21px'}}>
            Reduce your operating costs by 30%. Improve oversight on your distributors. Take control of your end investor data. 
          </p>
                            <Button
                  href="/#LearnMore"
                  >How do we do it?
                </Button>
              </Col>
              <Col lg={3} xs={12}></Col>
            </Row>
          </Container>
        </Col>
          <div class="imagetwo" style={{'padding-left':'33%',width: "75%", height: "75%",  'justifyContent': 'right'}}>
            <img src={productstop} />
          </div>

        </header>

        <Container style={{width:'150%'}}>



        </Container>
        <section
          id='Features'>
            <Row style= {{padding:"4%", }}>
              <Col lg={6} md={6} xs={12} style={{padding: "30px"}}>
                <Card body className="custom-card" style={{justifyContent: 'center', alignItems:'center'}}>
                <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}} href="/product#Investordata">Investor Data</h2>
                  <img className="img" src={investorimageten} style={{width:'70%',"max-height":"40vh"}}/>
                  <div style={{'padding-left':'10%','padding-right':'10%'}}>
                  <p className="typetwo"> Take control of your investor data across all your distributors</p>
                  <p className="typetwo"> Smart contracts enforce rules on trades and investors so you're always on the right side of regulation</p>
                  <p className="typetwo"> Share data on a need to know basis among your distribution network reducing duplication of work and sensitive data</p>
                  </div>
                </Card>
              </Col>
              <Col lg={6} md={6} xs={12} style={{padding: "30px"}}>
                <Card body className="custom-card" style={{justifyContent: 'center', alignItems:'center'}} >
                <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079"}} href="/#Tradedata" >Order Flow</h2>
                  <img className="img" src={tradedatatwo} style={{width:'80%',"max-height":"40vh"}}/>
                  <div style={{'padding-left':'10%','padding-right':'10%'}}>
                  <p className="typetwo"> Gain transparency over your distributors and their performance</p>
                  <p className="typetwo"> Offer direct access to your funds through open banking and the security of distributed technology</p>
                  <p className="typetwo"> Manage the order flow through smart contracts and reduce your fund costs by up to 30%</p>
                  </div>
                </Card>
              </Col>
            </Row>
            <section
              id='Investordata'>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079", "padding-top":"5%"}}>Investor Data Management</h2>
            </section>
            <Container style={{width:'150%'}}>
            <p style={{fontSize: '21px'}}>
              The first step to managing your own distribution is managing your investor's data. Tokenblocks gives you the tools to simply and efficiently manage onboarding, kyc and gdpr on a distributed network
             </p>
             </Container>
            <Row style={{marginBottom: '0px',"min-height":"600px"}}>
              <Col xs={12} md={7} style={{padding:"50px", 'padding-top':'20px'}} >
                <img src={investorimage13} style={{width: "100%",height:"90%","padding-top":"30px", "padding-left":"5%"}}/>
              </Col>

              <Col className='textCol' xs={12} md={5} style={{width: "90%","padding-top":"160px", 'padding-right':'5%'}}>
                <span>Remove the Regulatory Burden</span>

                <p className="typetwo"> Standardise investor data across distributors and transfer agents</p>
                <p className="typetwo"> Outsource KYC/ AML through your network or use your own internal processes </p>
                <p className="typetwo"> Give your end investors complete transparency over how you use their data </p>
                <p className="typetwo"> Investor data provenance means no more dormant accounts </p>
              </Col>

              <Col xs={12} md={6} className="dont-hide-phone">
                <img src={investorimage} style={{width: "100%",}}/>
              </Col>

            </Row>




            <Row style={{marginBottom: '40px', "min-height":"100px"}}>

              <Col className='textCol' xs={12} md={4} style={{"padding-left":"5%","width":"120%", "padding-top":"5%"}} >
                <span>Smart Data</span>
                 <p className="typetwo"> Improve your investors experience by offering direct access to your funds through Mobile, GUI or our API </p>
                <p className="typetwo"> Smart contracts enforce regulatory compliance based on jurisdiction and suitability</p>

              </Col>

              <Col xs={12} md={8} >
                <img src={investorimage14} style={{width: "90%", "padding-right":"5%"}}/>
              </Col>

            </Row>



            {
            // <Row style={{marginBottom: '80px',"min-height":"100px"}}>
            //   <Col xs={12} md={7} style={{padding:"50px"}} >
            //     <img src={investorimagenine} style={{width: "80%", "padding-left":"5%"}}/>
            //   </Col>

            //   <Col className='textCol' xs={12} md={5} style={{width: "100%","padding-top":"10p%","padding-left":"10%"}}>
            //     <span>Data Efficiency</span>
           
  
            //     <p className="typetwo">  Share data on a need to know basis within business units, different geographies and trusted service providers </p>
            //     <p className="typetwo"> Give investors direct control over their data and the ability to authorise and initiate data transfers  </p>
            //     <p className="typetwo"> Bullet Point </p>
            //   </Col>

            //   <Col xs={12} md={6} className="dont-hide-phone">
            //     <img src={investorimagenine} style={{width: "100%",}}/>
            //   </Col>

            // </Row>
          }

            <section
              id='Tradedata'>
            <h2 style={{fontWeight: 700, fontSize: '44px', color: "#642079", "padding-top":"5%"}}>Order Flow Management</h2>
            </section>
            <Container style={{width:'150%'}}>
            <p style={{fontSize: '21px'}}>
              
            Manage the end to end trade flow from aggregation and standardisation across distributors to netting and settlement of cash and units across banks and custodians.
          
               </p>
             </Container>
            <Row style={{marginBottom: '0px',"min-height":"600px"}}>
              <Col xs={12} md={7} style={{padding:"50px", 'padding-top':"20px"}} >
                <img src={tradedata4} style={{width: "100%",height:"90%","padding-top":"30px", "padding-left":"5%"}}/>
              </Col>

              <Col className='textCol' xs={12} md={5} style={{size: "90%","padding-top":"120px", 'padding-right':'5%'}}>
                <span>Distributed Access</span>

                <p className="typetwo"> Settle transactions directly with investors using Open Banking</p>
                <p className="typetwo"> Smart contracts enforce operational constraints like fund cut-off times and minimum order sizes across share classes </p>
                
              </Col>

            </Row>




            <Row style={{marginBottom: '40px', "min-height":"100px", "padding-bottom":"5%"}}>

              <Col className='textCol' xs={12} md={4} style={{"padding-left":"5%","width":"120%", "padding-top":"5%"}} >
                <span>Complete Order Flow Management</span>
                <p className="typetwo"> Distributed technology guarantees data accuracy, never reconcile data again </p>
                <p className="typetwo"> Complete flexibility to optimise cash netting across funds, banks, custodians and distributors </p>
                <p className="typetwo"> Data provenance makes chasing fails easy and means you and your investor can track every order in real time </p>

              </Col>

              <Col xs={12} md={8} >
                <img src={investorimagethree} style={{width: "90%", "padding-right":"5%"}}/>
              </Col>

            </Row>

            {
            // <Row style={{marginBottom: '80px',"min-height":"100px"}}>
            //   <Col xs={12} md={7} style={{padding:"50px"}} >
            //     <img src={investorimagenine} style={{width: "80%", "padding-left":"5%"}}/>
            //   </Col>

            //   <Col className='textCol' xs={12} md={5} style={{width: "100%","padding-top":"10p%","padding-left":"10%"}}>
            //     <span>Data Efficiency</span>
           
  
            //     <p className="typetwo">  Share data on a need to know basis within business units, different geographies and trusted service providers </p>
            //     <p className="typetwo"> Give investors direct control over their data and the ability to authorise and initiate data transfers  </p>
            //     <p className="typetwo"> Bullet Point </p>
            //   </Col>

            //   <Col xs={12} md={6} className="dont-hide-phone">
            //     <img src={investorimagenine} style={{width: "100%",}}/>
            //   </Col>

            // </Row>
          }


        </section>


        <Footer />
      </div>
    )
  }
}
