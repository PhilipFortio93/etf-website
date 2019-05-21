import React from 'react';
import {Container,Row,Col} from 'reactstrap';
import logo from '../assets/img/logo.webp';
import {Link} from 'react-router-dom';
import logotwo from '../assets/img/HighResLogoTrans.png';
import { Icon } from 'antd';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="Footer">
        <Container>
          <Row>
            <Col md={3} style={{textAlign: 'center'}}>
            <Icon type="sliders" style={{fontSize:"36px", color:'white'}} />
            Torch
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
              <p>hello@torch.io</p>
            </Col>
            <Col md={3}>
              <p>© Torch 2019</p>
              <a href="privacy-policy">Privacy policy</a>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}
