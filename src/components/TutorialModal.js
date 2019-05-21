import React from 'react';
import ReactJoyride from 'react-joyride';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
   Modal, Button, 
} from 'antd';
import "antd/dist/antd.css";
import "../toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';
import {StepsFunction} from '../tutorialsteps';

class TutorialModal extends React.Component {


	constructor(props) {
	    super(props);
	    this.state = {
        visible: false, //start tutorial
        visibletwo: false,
        visiblethree: false,
        visiblefour: false,
        steps: [],
        run: false,
	    }
  	}

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibletwo: true,
    });
  }

  handleOkTwo = (e) => {
    console.log(e);
    this.setState({
      visibletwo: false,
      visiblethree: true,
    });
  }

  handleOkThree = (e) => {
    console.log(e);
    this.setState({
      visiblethree: false,
      visiblefour:true,
    });

  }

  handleOkFour = (e) => {
    console.log(e);
    this.setState({
      visiblefour: false,
      run:true,
    });

  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibletwo: false,
      visiblethree: false,
      visiblefour: false,
      run:false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  componentDidMount(){
    let tutorialsteps = StepsFunction();

    this.setState({
      steps: tutorialsteps,
      })
  }

  componentWillReceiveProps(newProps) {
  }

  render() {

    const { run, steps, visible } = this.state;

    console.log(visible);

    return (

                
                <>
                <Button type="primary" onClick={this.showModal} style ={{marginRight:'2%', marginTop:'2%'}} >Tutorial</Button>
                  <ReactJoyride
                    continuous
                    run={run}
                    steps={steps}
                    autostart={true}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    scrollToSteps={true}
                    styles={{
                      options: {
                        primaryColor: '#4E2C68',
                      }
                    }}
                  />

                  <Modal
                    title="Data Driven Investing"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{'vertical-align':'top'}}
                  >
                    <p>So, you want to start investing? But… </p>
                    <ol>
                      <li> Don’t understand how investing works? </li>
                      <li> Worried about losing money?</li>
                      <li> Don’t have the time? </li>
                    </ol>
                  </Modal>
                  <Modal
                    title="Portfolio Calculator Tool"
                    visible={this.state.visibletwo}
                    onOk={this.handleOkTwo}
                    onCancel={this.handleCancel}
                  >
                    <p>We’re creating interactive tools and lessons to help you get off the ground!
                     </p>
                     <p> We’re not going to tell you what stocks to pick or how to time the market</p>
                     <p>
                     We analyse data to give you the confidence to make your own investment decisions saving you advisory costs and unnecessary fees.
                     </p>
                  </Modal>


                  <Modal
                    title="DIY Investing!"
                    visible={this.state.visiblethree}
                    onOk={this.handleOkThree}
                    onCancel={this.handleCancel}
                  >
                    <p>We’re going to keep it simple by starting with 3 high level types of investments</p>
                    <ol>
                      <li> Equity </li>
                      <li> Debt (Fixed Income) </li>
                      <li> Cash (Money Markets) </li>
                    </ol>
                    <p>We’re going to look at funds which invest in these 3 types of assets. 
                    At a high level they have very different risk profiles. 

                     </p>
                    <p>The trick is to generate a portfolio of these 3 that matches your tolerance for risk based on your life circumstances.</p>

                  </Modal>

                  <Modal
                    title="DIY Investing!"
                    visible={this.state.visiblefour}
                    onOk={this.handleOkFour}
                    onCancel={this.handleCancel}
                  >
                    <p>The three funds are:</p>
                    <ol>
                    <a target="_blank" href="https://www.ishares.com/uk/individual/en/products/251795/ishares-ftse-100-ucits-etf-inc-fund?switchLocale=y&siteEntryPassthrough=true">
                      <li> ISF LN - Invests in stocks of UK companies </li>
                    </a>
                      <li> SLXX LN - Invests in debt of UK companies </li>
                      <li> ERNS LN - Money Markets (basically just cash) </li>
                    </ol>
                    <p>
                    Typically equity is more volatile (it can go up and down a lot more) but has the potential for larger returns. 
                    Next is debt and then money markets. Lets construct a portfolio of these three and look at the numbers.
                     </p>
      
                  </Modal>

          </>


    )
  }

}

export default TutorialModal;
