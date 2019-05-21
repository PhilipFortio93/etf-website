import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {
 Card
} from 'antd';
import "antd/dist/antd.css";
import "../toolpage.css";
import 'bootstrap/dist/css/bootstrap.css';

class Platformfees extends React.Component {


	constructor(props) {
	    super(props);
	    this.state = {
	    }
  	}


	componentWillReceiveProps(newProps) {

	}

  render() {

    return (
      <div>
       <Card><p> Hello World </p></Card>
       </div>
    )
  }

}

export default Platformfees;