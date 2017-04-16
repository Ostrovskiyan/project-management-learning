import React, {Component} from 'react';
import {
    Dropdown, FormControl, FormGroup, Glyphicon, MenuItem, Nav, Navbar
} from "react-bootstrap";

class AppNavbar extends Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl className="NavbarSearch" type="text" placeholder="Поиск задач"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="glyphicon glyphicon-search" className="NavbarSearchIcon"/>
                        </FormControl.Feedback>
                    </FormGroup>
                </Navbar.Form>
                <Nav pullRight>
                    <Dropdown bsStyle="link">
                        <Dropdown.Toggle bsStyle="link" className="LogoutDropdown">
                            <img className="LogoutDropdownAvatar" src="/images/avatars/example.jpg"/>
                            johan
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="LogoutMenu">
                            <MenuItem header className="LogoutMenuAvatarWrapper">
                                <img className="LogoutMenuAvatar" src="/images/avatars/example.jpg"/>
                                johan doe
                            </MenuItem>
                            <MenuItem divider className="LogoutDivider"/>
                            <MenuItem className="LogoutButton">Выйти</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default AppNavbar;
