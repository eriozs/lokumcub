
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './assets/lokum.png';
import logo2 from './assets/lokumcu.png';

import React from "react";

function NavigasyonBari() {

    return(

        <Navbar>
            <NavDropdown title={<img src={logo}
                                     width="90"
                                     height="90"
                                     alt={"lokum"}
                                     className="d-inline-block align-baseline"/>}>

                <NavDropdown.Item href="/home" className="disabled">Ana Sayfa</NavDropdown.Item>
                <NavDropdown.Item href="/">Bayilik Basvuru</NavDropdown.Item>
            </NavDropdown>

            <Navbar.Brand
                className="mx-auto d-none d-sm-block"
            >
                <img src={logo2}
                     width="350"
                     height="90"
                     alt={"logo"}>
                </img>
            </Navbar.Brand>
            <Navbar.Brand
                href="/"
                className="mx-auto d-block d-sm-none">
                <img src={logo2}
                     width="240"
                     height="90"
                     alt={"logo"}>
                </img>
            </Navbar.Brand>
        </Navbar>
    );

}

export default NavigasyonBari;