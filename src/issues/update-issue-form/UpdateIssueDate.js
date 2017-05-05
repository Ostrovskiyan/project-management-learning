import React, {Component} from "react";
import styles from "./UpdateIssue.css";
import mainStyles from "../../common/Main.css";

class UpdateIssueDate extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={styles.Main}>
                <div className={styles.Header}>Когда эта задача должна быть готова?</div>
                <div className={styles.Options}>
                    <div className={styles.Option}>В ОЧЕРЕДИ</div>
                    <div className={styles.Option}>СЕГОДНЯ</div>
                    <div className={`${styles.Option} ${styles.Selected}`}>ЗАВТРА</div>
                    <div className={styles.Option}>НА СЛЕД. НЕДЕЛЕ.</div>
                    <div className={styles.Option}>ВЫБРАТЬ ДАТУ</div>
                </div>
            </div>
        )
    }
}

export default UpdateIssueDate;