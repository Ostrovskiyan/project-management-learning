import React, {Component} from "react";
import styles from "./DescriptionField.css";
import ImmediateInput from "../../general/immediate-input/ImmediateInput";

class DescriptionField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            active: true,
        })
    };

    handleToggle = (isActive) => {
        this.setState({
            active: isActive,
        })
    };

    render() {
        let {
            onChange,
            description,
        } = this.props;
        let {
            active,
        } = this.state;

        let content;
        if (active) {
            content = <ImmediateInput textArea
                                      withoutPlus
                                      submitOnBlur
                                      isActive
                                      textAreaRows={10}
                                      onSubmit={onChange}
                                      onToggle={this.handleToggle}
                                      defaultValue={description}
                                      text="Нажмите чтобы добавить описание"/>
        } else if (description && description !== "") {
            content = (
                <div className={styles.Desc}>
                    {description}
                </div>
            );
        } else {
            content = <ImmediateInput textArea
                                      withoutPlus
                                      submitOnBlur
                                      textAreaRows={10}
                                      onSubmit={onChange}
                                      defaultValue={description}
                                      text="Нажмите чтобы добавить описание"/>
        }

        return (
            <div onClick={!active && description && description !== "" ? this.handleClick : () => {}}
                 className={styles.DescriptionField}>
                {content}
            </div>
        );
    }
}

export default DescriptionField;