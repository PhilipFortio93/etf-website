import React from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,
  NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem, Dropdown, Button
} from 'reactstrap';
import {
  Link 
} from 'react-router-dom';
import TutorialModal from './TutorialModal'
import { Icon } from 'antd';
import './Nav.css';
import {bindActionCreators} from 'redux';
import portfolioActions from '../actions/actions';
import SpecialTag from './SpecialTag';
import {connect} from 'react-redux';

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

    if (this.state.tutorial) {
      tut = <NavItem><TutorialModal /></NavItem>;
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

            {tut}

            <NavItem>
              <NavLink><Button onClick={this.openGlossary}>Glossary</Button></NavLink>
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
    glossaryvisible: state.portfolioReducer.showGlossary
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
