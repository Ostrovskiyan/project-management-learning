import React, {Component} from 'react';
import styles from "./Main.css";
import AppNavbar from "./AppNavbar";
import {Col, Row} from "react-bootstrap";
import AppMenu from "./AppMenu";
import Issues from "../issues/Issues";
import {Route} from "react-router-dom";

class PageTemplate extends Component {
    render() {
        return (
            <div className={styles.Background}>
                <AppNavbar/>
                <Row className={styles.Main}>
                    <Col xs={2} className={`${styles.FullHeight} ${styles.Menu}`}>
                        <AppMenu/>
                    </Col>
                    <Route path="/issues" component={Issues}/>
                    <Route path="/projects" component={null}/>
                </Row>
            </div>
        )
    }
}

export default PageTemplate;