import React, {Component} from "react";
import styles from "./UnderlineMenu.css";

class UnderlineMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: props.options || [],
            selected: props.selected,
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
            selectedStyle
        } = this.props;
        let {
            options,
            selected,
        } = this.state;
        return (
            <div className={`${styles.Menu} ${menuStyle}`}>
                {
                    options.map(option =>
                        <div key={option.key}
                             className={`${styles.Option} ${option.key === selected ? `${selectedStyle || ""} ${styles.Selected}` : ""}`}
                             onClick={this.handleSelect(option.key)}>
                            {option.text}
                        </div>)
                }
            </div>
        )
    }
}

export default UnderlineMenu;