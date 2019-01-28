import React, { Component } from 'react';
import '../App.css';
class FooterBar extends Component {
  render() {
    return (
        <div className='footer-layout'>
            <div className='footer-container'>
            <a href="#" className='content-footer'>Syarat Penggunaan</a>
            <a href="#" className='content-footer'>Kebijakan Privasi</a>
            <a href="#" className='content-footer'>Tentang Kami</a>
            <a href="#" className='content-footer'>FAQ</a>
            <a href="#" className='content-footer'>Hubungi Kami</a>
            <p href="#" className='float-right-footer'>© 2019 by TokoFlix. All rights reserved. <br></br>
             <span className='circle-rounded'>as</span> v.1.0.0</p>
            </div>
            
        </div>
    );
  }
}

export default FooterBar;

