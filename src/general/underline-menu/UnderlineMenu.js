import React, {Component} from "react";
import styles from "./UnderlineMenu.css";
import {Link} from "react-router-dom";

class UnderlineMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
        };
    }

    componentWillReceiveProps(next) {
        this.state = {
            selected: next.selected,
        };
    }

    handleSelect(key) {
        let {onSelect} = this.props;
        return event => {
            event.preventDefault();
            if (onSelect) {
                onSelect(key);
            }
            this.setState({
                selected: key,
            });
        }
    }

    render() {
        let {
            menuStyle,
            selectedStyle,
            options = [],
            withoutClickHandling,
        } = this.props;
        let {
            selected,
        } = this.state;
        return (
            <div className={`${styles.Menu} ${menuStyle}`}>
                {
                    options.map(option => (
                        <Link key={option.key} to={option.to}>
                            <div className={`${styles.Option} ${option.key === selected ? `${selectedStyle || ""} ${styles.Selected}` : ""}`}
                                 onClick={!withoutClickHandling ? this.handleSelect(option.key) : event => {}}>
                                {option.text}
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }
}

export default UnderlineMenu;