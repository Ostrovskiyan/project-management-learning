import React, {Component} from "react";
import {Dropdown, FormControl, FormGroup, Glyphicon, MenuItem, Nav, Navbar} from "react-bootstrap";
import {getUser, logout} from "../actions/profile";
import {connect} from "react-redux";
import styles from "./Main.css";

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        let {
            dispatch,
            token,
        } = this.props;
        dispatch(getUser(token));
    }

    handleLogout(event) {
        this.props.dispatch(logout());
        event.preventDefault();
    }

    render() {
        let {
            user
        } = this.props;
        if (!user) {
            return null;
        }
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
                            <img alt="avatar" className={styles.LogoutDropdownAvatar} src={user.avatar}/>
                            {`${user.name}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.LogoutMenu}>
                            <MenuItem header className={styles.LogoutMenuAvatarWrapper}>
                                <img alt="avatar" className={styles.LogoutMenuAvatar} src={user.avatar}/>
                                {`${user.name} ${user.surname}`}
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

function mapStateToProps(state) {
    return {
        token: state.profile.token,
        user: state.profile.user,
    }
}

export default connect(mapStateToProps)(AppNavbar);
