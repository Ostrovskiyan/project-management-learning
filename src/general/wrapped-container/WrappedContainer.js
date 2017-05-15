import React, {Component} from "react";
import styles from "./WrappedContainer.css";

class WrappedContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false,
        };
    }

    handleHeaderClick = (event) => {
        event.preventDefault();
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        let {
            rootStyle,
            headerStyle,
            headerText,
            content
        } = this.props;
        let {
            open
        } = this.state;

        return (
            <div className={`${styles.Root} ${rootStyle}`}>
                <div className={`${styles.Header} ${headerStyle}`} onClick={this.handleHeaderClick}>
                    <i className={`fa fa-play ${open ? styles.Open : ""}`} aria-hidden="true"/>
                    {headerText}
                </div>
                {
                    open ?
                        content
                        : null
                }
            </div>
        )
    }
}

export default WrappedContainer;