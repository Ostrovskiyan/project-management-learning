import React, {Component} from "react";
import styles from "./DescriptionHeader.css";
import {Button, Dropdown, MenuItem} from "react-bootstrap";

class DescriptionHeader extends Component {

    settingMenuItems() {
        let {
            settingsOptions,
            onSettingSelect,
        } = this.props;
        return settingsOptions.map((option, i) => (
            <MenuItem key={i} eventKey={option.eventKey} onSelect={onSettingSelect}>
                {option.text}
            </MenuItem>
        ))
    }

    render() {
        let {
            headerText,
            headerStyle,
            headerBottomComponent: HeaderBottomComponent,
            settingsOptions,
            onSettingSelect,
        } = this.props;
        return (
            <div className={`${styles.Header} ${headerStyle ? headerStyle : ""}`}>
                <div>
                    <div className={styles.NameHeader}>{headerText}</div>
                    <div className={styles.HeaderButtons}>
                        <Button className={styles.HeaderOption}>
                            <i className={`fa fa-link ${styles.LinkAwesomeIcon}`} aria-hidden="true"/>
                        </Button>
                        <Dropdown id="settings">
                            <Dropdown.Toggle className={styles.HeaderOption} noCaret>
                                <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.SettingsMenu}>
                                {
                                    settingsOptions && onSettingSelect ?
                                        this.settingMenuItems()
                                        : null
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {
                    HeaderBottomComponent ?
                        <HeaderBottomComponent/>
                        : null
                }
            </div>
        )
    }
}

export default DescriptionHeader;