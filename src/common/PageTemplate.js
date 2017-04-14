import React, {Component} from 'react';
import "./Main.css";
import {FormControl, FormGroup, Glyphicon, Nav, Navbar, NavItem} from "react-bootstrap";;

class PageTemplate extends Component {
    render() {
        return (
            <div className="Background">
                <Navbar inverse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl className="NavbarSearch" type="text" placeholder="Поиск задач" />
                            <FormControl.Feedback>
                                <Glyphicon glyph="glyphicon glyphicon-search" className="NavbarSearchIcon"/>
                            </FormControl.Feedback>
                        </FormGroup>
                    </Navbar.Form>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default PageTemplate;