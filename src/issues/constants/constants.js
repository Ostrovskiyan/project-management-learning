import styles from "../../components/issue-status-dropdown/IssueStatusDropdown.css";

export const issueStatuses = {
    ACTIVE: {
        key: "ACTIVE",
        style: styles.active,
        text: "Активна",
    },
    DONE: {
        key: "DONE",
        style: styles.done,
        text: "Выполнена",
    },
    POSTPONED: {
        key: "POSTPONED",
        style: styles.postponed,
        text: "Отложена",
    },
    CANCELED: {
        key: "CANCELED",
        style: styles.canceled,
        text: "Отменена",
    },
};
