import React, { Component } from 'react';
import { Navbar ,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../App.css';
import logo from '../tokoflix.png';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saldo:0,
    }
    
}


componentWillMount(){
  console.log(localStorage.getItem('saldo'))
}
  render() {
    function formatPrice(value) {
      let val = (value/1).toFixed().replace('.')
      return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  if(this.props.saldo==NaN){
    var thesaldo = formatPrice(Number(this.props.saldo))
  }else{
    var thesaldo = formatPrice(Number(localStorage.getItem('saldo')))
  }
    return (
      
        <Navbar inverse collapseOnSelect className='customNavbar' fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <img alt='tokoflix' src={logo}></img>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className='mobileCollapse'>
          <Nav >
           
              <NavLink to='/'>
                <p className='link-home'>Home</p>
              </NavLink>
           
          </Nav>
          <Nav pullRight>
            <NavItem>
              {/* <p className='saldo-idr'>Saldo {formatPrice(Number(localStorage.getItem('saldo')))}</p> */}
              <p className='saldo-idr'>Saldo {thesaldo}</p> 
            </NavItem>
            <NavDropdown  className='saldo-idr' eventKey={3} title="Mr. Fulan" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Profile</MenuItem>
              <MenuItem eventKey={3.2}>
              <NavLink to='/myfilm'>
              <div className='link-home-none'>List Film Saya</div>
                </NavLink>  
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

