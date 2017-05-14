import React, {Component} from "react";
import styles from "../Issues.css";
import Checkbox from "../../general/checkbox/Checkbox";
import addUserImg from "../static/add-user.png";

class Subtask extends Component {

    render() {
        let {
            name,
            user,
        } = this.props;

        return (
            <div className={styles.Subtask}>
                <Checkbox wrapperStyle={styles.SubtaskCheckbox} withoutText/>
                <img alt="avatar" src={user ? user.avatar : addUserImg} role="avatar"/>
                <div role="name">
                    {name}
                </div>
            </div>
        )
    }
}

export default Subtask;