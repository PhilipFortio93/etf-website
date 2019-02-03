import React from 'react';
import Nav from './components/Nav';
import Button from './components/Button';
import Footer from './components/Footer'
import HubspotForm from 'react-hubspot-form';
import {Container,Row,Col} from 'reactstrap';
import { Document, Page } from 'react-pdf';
import sidelogo from './assets/img/sidelogo.jpg';
import pdf from './assets/img/fund-standard.pdf';
import stack from './assets/img/TradingStack3.png';

export default class Standard extends React.Component {
  render() {
    return (
      <div>
        <Nav {...this.props}/>
        <img style={{position: 'absolute', right: 0, width: '50%', opacity: 0.4}} src={sidelogo}/>
        <section id="Standard">
          <Container>
            <Row>
              <Col>
                <h1>Fund Tokens 1.0</h1>
                <h2>An Industry Driven Standard to Spark Adoption</h2>

                <p style={{fontSize: '22px'}}>For industry adoption we need a standard so that fund managers can move to issuing tokens on a blockchain with confidence.</p>

                <p style={{fontSize: '22px'}}>We’re partnering with industry experts both in blockchain and the fund world to build the rules behind the next wave of digital assets.</p>

                <p style={{fontSize: '22px'}}>Want to get involved in the conversation? Sign up</p>
                <HubspotForm
                  portalId='5065524'
                  formId='7ce390b8-8482-4d05-92b2-34aa6abd780b'
                  onSubmit={() => console.log('Submit!')}
                  onReady={(form) => console.log('Form ready!')}
                  loading={<div>Loading...</div>}
                />
                  <Button
                  href={pdf} target='_blank'
                  >Download the Full Standard
                </Button>
                <p></p>
                <h3>Introduction</h3>

                <p>The ST-20 and R-Token standards have provided a great starting point for the Security Token market. These standards are paramount for industry adoption, helping drive confidence in the new digital asset class.</p>

                <p>However, the existing standards are incredibly generic when it comes to specific asset classes preventing them from being fit for purpose.</p>

                <p>Below we focus on open-ended funds, defining a standard with the interests of investors and a well-functioning market at its core. The standard is based on 3 principles:</p>
                  <ol>
                    <li>Delegated responsibilities and accountability across participants</li>
                    <li>Technology agnostic</li>
                    <li>Asset class specific and fit for purpose </li>
                  </ol>
                <p>Industry input is key to the project and we actively encourage any and all feedback.</p>
                    <h3>Delegating Responsibility</h3>
                <div class="row" >

                  <div class="col-sm-8 col-md-8 col-xs-10">


                    <p>One feature of previous standards was the step to move regulatory compliance from the trading venue and embed it directly in the smart contract which defines the digital asset. </p>

                    <p>This moved KYC and AML compliance from the exchange to the token and created a more comprehensive approach to preventing malicious players from participating in the network.</p>
                    
                    <p>We believe this can and should be extended with well-defined responsibilities split between key components of the trading lifecycle. As an example, the token should enforce a mechanism to protect current investors from transaction costs due to large inflows (dilution levies). An exchange, however, would be responsible for ensuring an investor is made whole if the other side of their trade is not honoured.</p> 
                    
                    <p>Both have a responsibility over investor protection.</p>
                  </div>

                  <div class="col-sm-4 col-md-4 col-xs-16">
                    <div class="image">
                      <img src={stack} width='300px'/>
                    </div>
                  </div>

                </div>
                <br />
                <h3>Technology Agnostic</h3>

                  <p>We aim to be technology agnostic, believing that many blockchains are likely to emerge as institutions each build their own private versions. A standard should not be blockchain specific although it should provide constraints on the nature of the blockchain. As an example, a public blockchain can be made to satisfy the requirement of “Investor Privacy” by using zero knowledge proofs to maintain investor anonymity instead of using a permissioned blockchain.</p>
                  
                <h3>Fit for Purpose</h3>
                  
                  <p>The first widely adopted standard for tokens, ERC-20, did not stipulate rules around regulating ownership. With the view of being the standard for “Security Tokens”, ST-20, extended the scope to include rules-based management through whitelisting ownership. ST-20 however says nothing about the creation and redemption of new units, a key feature of open-ended funds. </p>
                  
                  <p>ST-20 went on to describe mechanisms for the distribution of dividends and management of other corporate action events but this still does not cover key functionality required for the trading of a fund such as the need to deal with swing pricing and dividend equalisation. Until this functionality has been incorporated ST-20 will never be fit for the open-ended fund market. </p>



                
                <h2>The Standard</h2>

                <p>Some features of the standard are functional and require enforcement via code. Others are properties stored on the ledger to provide an auditable method of disclosure to all investors. Finally, some features are processes and are expected to be enforceable by off chain rules and/or terms of business of the Token Issuer.</p>

                <ol>
                  <li>
                    Regulatory Compliance
                    <ol type = 'a'>
                    <li> Investors must have been whitelisted by undergoing valid Know Your Customer (KYC) and Anti-Money Laundering (AML) checks</li>
                    <li> A digital share must be able to differentiate between types of participants such as retail, professional, institutional etc.</li>
                    <li> Jurisdiction of the investor must be known to manage cross border sales, regulations and taxes.</li>
                    <li> Counterparties must be able to define specific relationships allowing flexibility in trading depending on relationship-based rules.</li>
                    <li> All relevant disclosures and disclaimers prior to investment and during the management of the fund. This includes the issuing of KIIDs and Prospectuses to investors </li>
                    <li> Trade reporting through a venue or Approved Publication Arrangement (within the needs of regulatory reporting standards). </li>
                    </ol>
                  </li>

                  <li>
                    Governance around Investor Protection
                    <ol type = 'a'>
                      <li> Unless an investor chooses to opt-out it should be encouraged that settlement takes place at a regulated digital custodian</li>
                      <li> Adequate processes in place to ensure off market transactions do not occur without appropriate justifications. I.e. such as through the use of a designated sponsor or “Market Maker” who has obligations with regards to liquidity</li>
                      <li> A mechanism for recovering ownership or providing insurance in the case of lost or stolen private keys</li>
                      <li> All information on the funds strategy and structure must be easily accessible </li>
                      <li> There must be a centrally accountable entity for the orderly functioning of the token </li>
                      <li> Robust governance and process around upgrading the ledger and token specific code. This requires considerations due to the immutability of the technology.</li>
                      <li> A mechanism to disclose any unexpected events which can cause moves in the NAV of the fund </li>

                    </ol>
                  </li>

                  <li>
                    Fund Specific Functionality
                    <ol type = 'a'>
                      <li>  Must be able to handle ongoing subscriptions and redemptions of units and ALWAYS have a price vs NAV during normal market hours and conditions.</li>
                      <li>  The ability to pay and manage dividends (where necessary by the share class) and other corporate actions</li>
                      <li>  The ability to deal with dilution levies and/or swing pricing to protect investors in the case of large inflows/outflows</li>
                      <li>  The ability to have a lending market. Key for allowing market makers to provide liquidity.</li>
                      <li>  Must be able to enforce privacy where needed and desired.</li>
                      <li>  Must enforce a 1:1 relationship with legal entities for accountability</li>
                      <li>  Must enforce the finality of a transaction near instantaneously</li>
                      <li>  Must provide provenance of ownership</li>

                    </ol>
                  </li>

                </ol>




                <h2>Properties that must be defined for a Fund Token:</h2>

                <ol>
                  <li>Jurisdiction of the fund</li>
                  <li>Legal Structure of the Fund</li>
                  <li>Regulatory Structure of the Fund</li>
                  <li>Allowed Investor Base [Retail/ Institutional/ Professional]</li>
                  <li>Base Currency of the Fund</li>
                  <li>ISIN of the replicated share class</li>
                  <li>Who the regulatory body monitoring the fund is</li>
                  <li>Who disputes can be sent to</li>
                  <li>Income distribution [Accumulating or Distributing]</li>
                  <li>A link to where the KIIDs and Prospectus of the fund can be found</li>
                  <li>The underlying investment strategy of the fund</li>
                  <li>The benchmark of the fund</li>
                  <li>The management fee of the fund</li>
                  <li>Primary Market Minimum entry size</li>
                  <li>Maximum Front Load</li>
                  <li>Maximum Back Load</li>
                </ol>


              </Col>
            </Row>
          </Container>


        </section>
        <Footer/>
      </div>
    );
  }
}
