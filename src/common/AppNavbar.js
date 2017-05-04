import React, {Component} from 'react';
import {
    Dropdown, FormControl, FormGroup, Glyphicon, MenuItem, Nav, Navbar
} from "react-bootstrap";
import {logout} from "../actions/profile";
import {getUser} from "../api/api";
import {connect} from "react-redux";
import styles from "./Main.css";

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.user = getUser();
    }

    handleLogout(event) {
        this.props.dispatch(logout());
        event.preventDefault();
    }

    render() {
        return (
            <Navbar inverse className={styles.AppNavbar}>
                <Navbar.Form pullLeft className={styles.NavbarSearchWrapper}>
                    <FormGroup className={styles.NavbarSearchFormGroup}>
                        <FormControl className={styles.NavbarSearch} type="text" placeholder="Поиск задач"/>
                        <FormControl.Feedback>
                            <Glyphicon glyph="glyphicon glyphicon-search" className={styles.NavbarSearchIcon}/>
                        </FormControl.Feedback>
                    </FormGroup>
                </Navbar.Form>
                <Nav pullRight>
                    <Dropdown id="logout-dropdown" bsStyle="link">
                        <Dropdown.Toggle bsStyle="link" className={styles.LogoutDropdown}>
                            <img className={styles.LogoutDropdownAvatar} src={this.user.avatar}/>
                            {`${this.user.name}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.LogoutMenu}>
                            <MenuItem header className={styles.LogoutMenuAvatarWrapper}>
                                <img className={styles.LogoutMenuAvatar} src={this.user.avatar}/>
                                {`${this.user.name} ${this.user.surname}`}
                            </MenuItem>
                            <MenuItem divider className={styles.LogoutDivider}/>
                            <MenuItem className={styles.LogoutButton} onClick={this.handleLogout}>Выйти</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        )
    }
}


export default connect()(AppNavbar);
