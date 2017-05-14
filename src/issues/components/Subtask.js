import React, {Component} from "react";
import styles from "../Issues.css";
import Checkbox from "../../general/checkbox/Checkbox";
import addUserImg from "../static/add-user.png";
import DropdownInput from "../../general/dropdown-input/DropdownInput";
import SelectSubtaskUser from "./SelectSubtaskUser";

class Subtask extends Component {

    render() {
        let {
            name,
            users,
            id,
            onChangeSubtaskUser,
            userId
        } = this.props;

        let avatar;

        let user = users.filter(user => user.id === userId)[0];

        if (user) {
            avatar = <img alt="avatar" src={user.avatar} role="avatar"/>;
        } else {
            function Avatar() {
                return <img alt="avatar" src={addUserImg} role="avatar"/>;
            }

            avatar = <DropdownInput id="select-subtask-user"
                                    toggle={Avatar}
                                    contentProps={{
                                        users
                                    }}
                                    onSubmit={(userId) => onChangeSubtaskUser(id, userId)}
                                    content={SelectSubtaskUser}/>;
        }
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