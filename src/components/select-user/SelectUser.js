import React, {Component} from "react";
import styles from "./SelectUser.css";

class SelectUser extends Component {

    handleClickCreator = (id) => {
        return function (event) {
            event.preventDefault();
            this.props.onSubmit(id);
        }.bind(this);
    };

    getUsers() {
        let {
            users,
            selectedId,
        } = this.props;

        if (users.length === 0) {
            return <div>Отсутсвуют...</div>
        }

        return users.map(user => {
                if (!user.isEmpty) {
                    return (
                        <div key={user.id} className={`${styles.UserItem} ${selectedId === user.id ? styles.Selected : ""}`}
                             onClick={this.handleClickCreator(user.id)}>
                            <div>
                                <img alt="avatar" src={user.avatar}/>
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
                    )
                } else {
                    return (
                        <div key={user.id} className={styles.UserItem} onClick={this.handleClickCreator(user.id)}>
                            <div className={styles.Empty}>
                                {user.name}
                            </div>
                        </div>
                    )
                }
            }
        );
    }

    render() {
        return (
            <div className={styles.SelectUser}>
                <div className={styles.Header}>
                    Добавьте пользователя
                </div>
                {this.getUsers()}
            </div>
        )
    }
}

export default SelectUser;
