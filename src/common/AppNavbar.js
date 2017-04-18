import React, {Component} from 'react';
import {
    Dropdown, FormControl, FormGroup, Glyphicon, MenuItem, Nav, Navbar
} from "react-bootstrap";
import {logout} from "../actions/profile";
import {connect} from "react-redux";

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.props.dispatch(logout());
        event.preventDefault();
    }

    render() {
        return (
            <Navbar inverse className="AppNavbar">
                <Navbar.Form pullLeft className="NavbarSearchWrapper">
                    <FormGroup className="NavbarSearchFormGroup">
                        <FormControl className="NavbarSearch" type="text" placeholder="Поиск задач"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="glyphicon glyphicon-search" className="NavbarSearchIcon"/>
                        </FormControl.Feedback>
                    </FormGroup>
                </Navbar.Form>
                <Nav pullRight>
                    <Dropdown id="logout-dropdown" bsStyle="link">
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
                            <MenuItem className="LogoutButton" onClick={this.handleLogout}>Выйти</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default connect()(AppNavbar);
