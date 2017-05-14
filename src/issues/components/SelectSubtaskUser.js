import React, {Component} from "react";
import styles from "../Issues.css";

class SelectSubtaskUser extends Component {

    handleClickCreator = (id) => {
        return function(event) {
            event.preventDefault();
            this.props.onSubmit(id);
        }.bind(this);
    };

    getUsers () {
        let {
            users,
        } = this.props;

        return users.map(user =>
            <div key={user.id} role="user-item" onClick={this.handleClickCreator(user.id)}>
                <div>
                    <img alt="avatar" src={user.avatar} />
                </div>
                <div>
                    <div>
                        {`${user.name} ${user.surname}`}
                    </div>
                    <div role="email">
                        {user.email}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.SelectSubtaskUser}>
                <div role="header">
                    Добавьте пользователя
                </div>
                {this.getUsers()}
            </div>
        )
    }
}

export default SelectSubtaskUser;
