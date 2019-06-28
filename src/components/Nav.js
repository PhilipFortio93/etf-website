import React from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,
  NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem, Dropdown
} from 'reactstrap';
import {
  Link 
} from 'react-router-dom';
import TutorialModal from './TutorialModal'
import { Icon, Button } from 'antd';
import './Nav.css';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
import SpecialTag from './SpecialTag';
import {connect} from 'react-redux';
import { Auth } from 'aws-amplify'

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err))
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

class _Nav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleproduct = this.toggleproduct.bind(this);
    this.openGlossary = this.openGlossary.bind(this);
    this.state = {
      isOpen: false,
      links: [],
      productdownOpen: false,
      tutorial: false,
    };
  }



  updateLinks(props){

    if(props.location.pathname === '/toolpage'){
      this.setState({tutorial:true})
    }

    let links = [{
      href: '/',
      name: 'Home'
    },{
        href: '/toolpage',
        name: 'Tutorial'
     },{
        href: '/etfsearch',
        name: 'ETFs'
      },{
        href: '/custompage',
        name: 'Portfolio Builder'
      },{
        href: '/tablepage',
        name: 'Table'
      },
      // {
      //   href: '/glossary',
      //   name: 'Glossary'
      // },
    {
     href: 'https://medium.com/tokenblocks',
     name: 'Blog'
    }];
    // if(props.location.pathname === '/') {
    //   links = links.concat([{
    //     href: '#Partners',
    //     name: 'Partners'
    //   },{
    //     href: '#LearnMore',
    //     name: 'Learn more'
    //   }]);
    // }
    // if(props.location.pathname === '/toolpage') {
    //   links = links.concat([{
    //     href: '#Features',
    //     name: 'Glossary'
    //   },{
    //     href: '/etfpage',
    //     name: 'ETFs'
    //   }]);
    // }


    this.setState({
      links: links
    })
  }
  componentDidMount() {
    this.updateLinks(this.props);
  }

  componentWillReceieveProps(nextProps) {
    this.updateLinks(nextProps);
    
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleproduct() {
    this.setState({
      productdownOpen: !this.state.productdownOpen
    });
  }

  openGlossary(){
    console.log("we made it baby")
    this.props.showGlossary(true);
  }

  render() {
    let tut;
    let loggedinstatus = this.props.user;

    let signedin;

    if(loggedinstatus!='null' && loggedinstatus){
      let user = this.props.user.user.attributes.email
      signedin = <NavItem><p style={{color:'white'}}>Logged in as: {user}</p></NavItem>;
    }


    console.log('user: ',this.props.user)

    if (this.state.tutorial) {
      tut = <NavItem style={{color:'white'}}><TutorialModal /></NavItem>;
    }

    return (
      <div>
        <Navbar color="white" dark expand="md" className="custom-nav">
          <NavbarBrand href="/" style={{fontWeight: 700, color:'white'}}>
            <Icon type="sliders" style={{fontSize:"36px", marginTop:"-20%", color:'white'}} />
            Torch
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

            {signedin}
            {tut}

            <NavItem>
              <NavLink><Button onClick={this.openGlossary}><p style={{color:'white'}}>Glossary</p></Button></NavLink>
            </NavItem>
            <NavItem>
              <Button type="primary" onClick={checkUser}><p style={{color:'white'}}>Check User</p></Button>
            </NavItem>
              {/*}
                 <Dropdown isOpen={this.state.productdownOpen} toggle={this.toggleproduct}>
                  <DropdownToggle style={{background: '#EFF2F7', color: '#642079', border: 'none', height:'39px', 'align-items': 'flex-end'}}>
                    Products
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><NavLink href={'/product/#Investordata'}>Investor Data</NavLink></DropdownItem>
                    <DropdownItem><NavLink href={'/product/#Tradedata'}>Order Data</NavLink></DropdownItem>
                    <DropdownItem><NavLink href={'/hfproduct'}>Hedge Fund Transfer Agency</NavLink></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              */}
              
            
              {
                this.state.links.map((link) => {
                  return (
                    <NavItem>
                      <NavLink><Link to={link.href}>{link.name}</Link></NavLink>
                    </NavItem>
                  )
                })
              }


            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    portfolioredux: state.portfolioReducer.portfolio,
    glossaryvisible: state.portfolioReducer.showGlossary,
    user: state.portfolioReducer.user
  };
}

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(portfolioActions.createItem(item)),
  deleteItem: id => dispatch(portfolioActions.deleteItem(id)),
  updateWeight: (id, weight) => dispatch(portfolioActions.updateWeight(id,weight)),
  showGlossary: (show) => dispatch(portfolioActions.showGlossary(show))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Nav);
