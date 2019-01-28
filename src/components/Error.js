import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../App.css';

class Error extends Component {
  render() {
    return (
      <div>
      <div className='bg-container-layout align-center'>
          <h1 className='font-default text-align-top-150'>Halaman Tidak Ditemukan</h1>
          <NavLink to='/'>
          <Button 
            className='buy-button' 
          > Kembali Ke Beranda</Button>
          </NavLink>
      </div>
      </div>
    );
  }
}

export default Error;