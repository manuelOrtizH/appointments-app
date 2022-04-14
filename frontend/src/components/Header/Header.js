import React from "react";
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { Logo } from './Logo';


export default function Header(){
    return (
        <header class='shadow-lg'>
          
          <MDBNavbar expand='lg' light bgColor='white'>
          <Logo></Logo>
            <MDBContainer fluid>
              <MDBNavbarToggler
                aria-controls='navbarExample01'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <MDBIcon fas icon='bars' />
              </MDBNavbarToggler>
              <div className='collapse navbar-collapse ' id='navbarExample01'>
                <MDBNavbarNav right className='mb-2 mb-lg-0'>
                  <MDBNavbarItem active>
                    <MDBNavbarLink aria-current='page' href='#'>
                      Inicio
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Citas</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Historial</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Perfil</MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </div>
            </MDBContainer>
          </MDBNavbar>

        </header>
    );
}