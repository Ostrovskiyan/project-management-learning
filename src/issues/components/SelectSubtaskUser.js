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
            <div key={user.id} className={styles.UserItem} onClick={this.handleClickCreator(user.id)}>
                <div>
                    <img alt="avatar" src={user.avatar} />
                </div>
                <div>
                    <div>
                        {`${user.name} ${user.surname}`}
                    </div>
                    <div className={styles.Email}>
                        {user.email}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.SelectSubtaskUser}>
                <div className={styles.Header}>
                    Добавьте пользователя
                </div>
                {this.getUsers()}
            </div>
        )
    }
}

export default SelectSubtaskUser;
