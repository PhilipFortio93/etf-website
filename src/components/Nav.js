import React from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,
  NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem
} from 'reactstrap';
import logo from '../assets/img/logo.webp';
import './Nav.css';

export default class _Nav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      links: []
    };
  }
  updateLinks(props){
    let links = [{
      href: '/investors',
      name: 'Investors'
    }];
    if(props.location.pathname === '/') {
      links = links.concat([{
        href: '#Features',
        name: 'Features'
      },{
        href: '#LearnMore',
        name: 'Learn more'
      }]);
    }
    if(props.location.pathname === '/investors') {
      links = links.concat([{
        href: '#Features',
        name: 'Features'
      }]);
    }
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
  render() {
    return (
      <div>
        <Navbar color="#000" dark expand="md" className="custom-nav">
          <NavbarBrand href="/" style={{fontWeight: 700}}>
            <img src={logo} className="logo"/>
            TokenBlocks
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                this.state.links.map((link) => {
                  return (
                    <NavItem>
                      <NavLink href={link.href}>{link.name}</NavLink>
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
