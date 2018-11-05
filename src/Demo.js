import React, { Component } from 'react';
import Nav from './components/Nav';
import Button from './components/Button';
import Footer from './components/Footer'
import Vimeo from 'react-vimeo';
import {Container,Row,Col} from 'reactstrap';

const videoId = "296704728"

class Demo extends Component {
  render() {
    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
          <Container>
            <Row>
              <Col
                md={{ size: 6, offset: 3 }}
                xs={12}>
                <iframe src="https://player.vimeo.com/video/296704728" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Demo;
