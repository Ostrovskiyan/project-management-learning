import React, {Component} from "react";
import styles from "../Issues.css";
import Checkbox from "../../general/checkbox/Checkbox";
import addUser from "../static/add-user.png";
import DropdownInput from "../../general/dropdown-input/DropdownInput";
import SelectUser from "../../components/select-user/SelectUser";

class Subtask extends Component {

    render() {
        let {
            name,
            users,
            id,
            onChangeSubtaskUser,
            userId
        } = this.props;

        let user = users.filter(user => user.id === userId)[0];

        function Avatar() {
            return <img alt="avatar" src={user ? user.avatar : addUser} role="avatar"/>;
        }

        let avatar = <DropdownInput id="select-subtask-user"
                                toggle={Avatar}
                                contentProps={{
                                    users
                                }}
                                onSubmit={(userId) => onChangeSubtaskUser(id, userId)}
                                content={SelectUser}/>;
        return (
            <div className={styles.Subtask}>
                <Checkbox wrapperStyle={styles.SubtaskCheckbox} withoutText/>
                {avatar}
                <div role="name">
                    {name}
                </div>
            </div>
        )
    }
}

export default Subtask;