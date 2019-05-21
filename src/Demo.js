import React, { Component } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import {Container,Row} from 'reactstrap';

const videoId = "296704728"

class Demo extends Component {
  render() {
    return (
      <div>
        <Nav {...this.props} />
        <section id="Demo">
          <Container>
            <Row>
              <p>
              Thanks for reaching out, we will be in touch shortly!
              </p>
              {/*}
              <Col
                md={{ size: 6, offset: 3 }}
                xs={12}>
                <iframe src="https://player.vimeo.com/video/296704728" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </Col>
              */}
              
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Demo;
