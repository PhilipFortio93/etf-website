import React from 'react';
import Nav from './components/Nav';
import Button from './components/Button';
import Footer from './components/Footer'
import HubspotForm from 'react-hubspot-form';
import {Container,Row,Col} from 'reactstrap';
import sidelogo from './assets/img/sidelogo.jpg';

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

                <h3>Introduction - Rationale</h3>

                <p>The ST-20 and R-Token standards have been a great start for the Security Tokens market. Standards are paramount for industry adoption, helping drive confidence in the new digital asset class.</p>

                <p>However the current existing standards are incredibly generic when it comes to specific asset classes preventing them from being fit for purpose.</p>

                <p>Below we focus on open-ended funds, defining a standard with the interests of investors and a well functioning market at its core. Industry feedback is key to the project and we actively encourage any and all feedback [link].</p>

                <h3>Defining Rules at the Token Level and Exchange Level</h3>

                <p>One feature of previous standards was the step to move regulatory compliance from the exchange layer of the ecosystem to the token.</p>

                <p>This moved KYC and AML compliance from the exchange to the token and created a more comprehensive approach to preventing malicious players from participating in the network.</p>

                <p>We believe this can and should be extended with well defined responsibilities split between the token and the exchange. As an example a fund token should enforce a mechanism to protect current investors when a large investor buys in to the fund incurring significant transaction costs. An exchange, however, would be responsible for ensuring an investor is made whole if the other side of their trade is not honoured.</p>

                <p>Both have a responsibility over investor protection.</p>

                <h3>Blockchain Agnostic</h3>

                <p>We aim to be technology agnostic, believing that many blockchains are likely to emerge as institutions each build their own private variants. A standard should not be blockchain specific although it should provide constraints on the nature of the blockchain. As an example a public blockchain can be made to satisfy the requirement of “Investor Privacy” using zero knowledge proofs instead of having this feature inbuilt as is the case with a permissioned blockchain.</p>


                <h2>The Standard</h2>

                <p>Some features of the standard are functional and require enforcement via code. Others are properties stored on the ledger to provide an auditable method of disclosure to all investors. Finally, some features are processes and are expected to be enforceable by off chain rules and/or terms of business of the Token Issuer.</p>

                <ol>
                  <li>
                    Regulatory Compliance
                    <ul>
                      <li>Any transacting investor must have been whitelisted by undergoing valid Know Your Customer (KYC) and Anti-Money Laundering Checks (AML)</li>
                      <li>A digital share must be able to differentiate between types of participants, in particular retail, professional, institutional, platform.</li>
                      <li>Jurisdiction of the investor must be known to restrict certain funds which cannot be sold in certain jurisdictions (i.e. most UCITS funds cannot be sold to US investors) as well as for tax purposes.</li>
                      <li>All funds must issue KIIDs and Prospectuses to their investor base as standard - the token should provide easy access to these documents (via links or other means)</li>
                    </ul>
                  </li>

                  <li>
                    Investor Protection
                    <ul>
                      <li>The digital asset should be issued in custody at a trusted whitelisted third party. This is prudent and in the best interests of the investor, however the investor has the option to opt-out when they choose</li>
                      <li>The fund token must deal with dilution levys/ swing pricing to protect investors in the cases of large inflows/outflows</li>
                      <li>A designated sponsor or “Market Maker” who has obligations with regards to liquidity</li>
                      <li>A mechanism for recovering ownership in the case of lost or stolen private keys</li>
                      <li>All information on the funds strategy and structure must be easily accessible</li>
                      <li>There must be a centrally accountable entity for the orderly functioning of the token</li>
                    </ul>
                  </li>

                  <li>
                    Securities Specific Functionality
                    <ul>
                      <li>Must be able to handle on-going subscriptions and redemptions of units and must ALWAYS have a price vs NAV during normal market hours and conditions.</li>
                      <li>The ability to pay and manage dividends (where necessary by the share class)</li>
                      <li>The ability to allow shareholder voting on significant proposed changes (where necessary by the share class)</li>
                      <li>The ability to have a lending market. Key for allowing market makers to provide liquidity.</li>
                    </ul>
                  </li>
                  <li>
                    Future Proofing
                    <ul>
                      <li>Must have an upgrade/ registry mechanism</li>
                      <li>Plans for interoperability</li>
                    </ul>
                  </li>
                  <li>
                    Reporting
                    <ul>
                      <li>Disclosures on shareholders with significant holdings as per regulations</li>
                      <li>An easily accessible portal where all trades can be made available and viewed (within the needs of regulatory reporting standards)</li>
                      <li>A mechanism to disclose any unexpected events which can cause moves in the NAV of the fund</li>
                      <li>All relevant disclosures and disclaimers prior to investment.</li>
                    </ul>
                  </li>
                  <li>
                    Choice of Distributed Ledger
                    <ul>
                      <li>Must be able to enforce privacy where needed and desired.</li>
                      <li>Must enforce a 1:1 relationship with legal entities for accountability</li>
                      <li>Must enforce the finality of a transaction near instantaneously</li>
                      <li>Must provide provenance of ownership</li>
                    </ul>
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
