import React, { Component } from 'react';
import Nav from './components/Nav';
import Button from './components/Button';
import Footer from './components/Footer'


class CookiesPolicy extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <section id="CookiesPolicy">
          <Container>
            <Row>
              <Col md={8} xs={12}>
                <h2>Introduction</h2>
                <p>Token Blocks takes your privacy very seriously. This privacy policy has been prepared in line with the EU’s General Data Protection Regulation (GDPR) which took effect on 25 May 2018. The GDPR promotes fairness and transparency for all individuals in respect of their personal data.</p>

                <p>This privacy policy applies to all data we process. Token Blocks powers dynamic privacy policies - so whenever we request data from you that requires your consent, we will ask for it explicitly. To enable this, we make a record of your consent (or otherwise) to the collection and use of such data whenever requested.</p>

                <p>If you would like to get in touch about anything in this policy or about your personal data then please contact us at privacy@tokenblocks.io</p>
                <h2>1. Data we collect</h2>
                <p>As a data controller we collect a variety of data in order to deliver our services. Whenever we collect Personal Information from you, we let you know and you will be able to access the following precise information:</p>

                <ul>
                  <li>data we have collected from you</li>
                  <li>the basis on which we are holding it (e.g. because you gave us consent)</li>
                  <li>what we will do with it</li>
                  <li>how long we will hold it for</li>
                  <li>where it is stored</li>
                  <li>who it might be shared with</li>
                  <li>your rights in relation to the data, and</li>
                  <li>information on how you can access and manage this data.</li>
                </ul>
                <p>We have provided further detail below about the specific types of data we collect and our reasons for doing so.</p>

                <h4>1.1. What data do we ask you to provide to us, and why?</h4>
                <p>We collect the following data:</p>


                <h5>Account</h5>
                <ol>
                  <li>Email address:
                    <ul>
                      <li>to set up, manage and provide you secure access to your account</li>
                      <li>to send you emails from time to time about the service, including important security, functionality or privacy notifications</li>
                    </ul>
                  </li>
                  <li>Company name:
                    <ul>
                      <li>to allow users from the same company to collaborate</li>
                    </ul>
                  </li>
                </ol>
                <h5>Assistance</h5>
                <ol>
                  <li>Email address:
                    <ul>
                      <li>to respond to queries, comments and questions from customers</li>
                    </ul>
                  </li>
                </ol>
                <h4>1.2. What data do we collect when you visit our website, and why?</h4>
                <p>We collect cookies. Cookies are small pieces of data that websites send to a user's computer and are stored on the user's web browser. They are designed to enable the website to remember information, such as what a user might have put in a shopping cart for example.</p>

                <p>For more information on our use of cookies you can view our cookie policy</p>

                <h2>2. What personal data do we share with third parties and who are they?</h2>
                <p>To power our services, we store or share personal data with the following third parties:</p>

                <ul>
                  <li>Amazon - Data is not transferred outside of the European Economic Area.</li>
                  <li>Google - Data is not transferred outside of the European Economic Area.</li>
                  <li>Drift - Data is transferred outside of the European Economic Area to United States under the protection of EU/US Privacy Shield.</li>
                </ul>
                <p>There are certain situations in which we may share access to your personal data without your explicit consent; for example, if required by law, to protect the life of an individual, or to comply with any valid legal process, government request, rule or regulation.</p>

                <h2>3. Why do we share data outside of the EU</h2>
                <p>We may transfer personal data to a country outside of the European Economic Area (EEA), for example if a third party we share data with has servers located outside of the EEA. If this is the case we will obtain your consent or otherwise ensure that the transfer is legal and your data is secure by following the EU's guidelines.</p>

                <p>You can see above where we send data outside of the EEA and on what basis we do so.</p>

                <h2>4. How do we keep your personal data secure?</h2>
                <p>We keep your data secure:</p>

                <ul>
                  <li>by following internal policies of best practice and training for staff</li>
                  <li>by encrypting personal data</li>
                  <li>by using Secure Socket Layer (SSL) technology when information is submitted to us online</li>
                </ul>

                <p>In the unlikely event of a criminal breach of our security we will inform the relevant regulatory body within 72 hours and, if your personal data were involved in the breach, we shall also inform you.</p>

                <h2>5. Changes to our privacy policy and control</h2>
                <p>We may change this privacy policy from time to time. When we do, we will let you know by changing the date on this policy and notifying you of significant changes. By continuing to access or use our services after those changes become effective, you agree to be bound by the revised privacy policy.</p>

                <h2>6. Your rights</h2>
                <p>You have the following rights over your data, depending on the basis on which it is held:</p>

                <ul>
                  <li>the right to be informed about the collection and use of your personal data</li>
                  <li>the right of access to your personal data and any supplementary information</li>
                  <li>the right to have any errors in your personal data rectified</li>
                  <li>the right to have your personal data erased</li>
                  <li>the right to block or suppressing the processing of your personal data</li>
                  <li>the right to move, copy or transfer your personal data from one IT environment to another</li>
                  <li>the right to object to processing of your personal data in certain circumstances, and</li>
                  <li>rights related to automated decision-making (i.e. where no humans are involved) and profiling (i.e. where certain personal data is processed to evaluate an individual).</li>
                </ul>
                <p>While we do not hold personal data any longer than we need to, the duration will depend on your relationship with us.</p>

                <h2>7. Contact us</h2>
                <p>We are Token Blocks and our address is Lower Ground, 10 Finsbury Square, London EC2A 1AF. You can contact our Data Protection Officer at privacy@tokenblocks.io.</p>

              </Col>
            </Row>
          </Container>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default CookiesPolicy;
