import React, {Component} from "react";
import styles from "./DescriptionHeader.css";
import {Button} from "react-bootstrap";

class DescriptionHeader extends Component {

    render() {
        let {
            headerText,
            headerStyle,
            headerBottomComponent: HeaderBottomComponent,
        } = this.props;
        return (
            <div className={`${styles.Header} ${headerStyle ? headerStyle : ""}`}>
                <div>
                    <div className={styles.NameHeader}>{headerText}</div>
                    <div className={styles.HeaderButtons}>
                        <Button className={styles.HeaderOption}>
                            <i className={`fa fa-link ${styles.LinkAwesomeIcon}`} aria-hidden="true"/>
                        </Button>
                        <Button className={styles.HeaderOption}>
                            <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                        </Button>
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