import React from 'react';
import {Container,Row,Col} from 'reactstrap';
import logo from '../assets/img/logo.webp';
import {Link} from 'react-router-dom';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="Footer">
        <Container>
          <Row>
            <Col md={3} style={{textAlign: 'center'}}>
              <img src={logo} className="logo" style={{height: '100px'}}/>
              <h3>TokenBlocks</h3>
            </Col>
            <Col md={3}>
              <h5>Address</h5>
              <p>
                86-90 Paul Street<br/>
                3rd Floor<br/>
                London<br/>
                United Kingdom<br/>
                EC2A 4NE<br/>
              </p>
            </Col>
            <Col md={3}>
              <h5>Get in touch</h5>
              <p>hello@tokenblocks.io</p>
            </Col>
            <Col md={3}>
              <p>© TokenBlocks 2018</p>
              <a href="privacy-policy">Privacy policy</a>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}
