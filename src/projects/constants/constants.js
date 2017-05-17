import styles from "../Projects.css";

export const projectStatuses = [
    {
        key: "GREEN",
        text: "Зеленый",
        headerStyle: styles.HeaderWithGreenStatus,
    },
    {
        key: "RED",
        text: "Красный",
        headerStyle: styles.HeaderWithRedStatus,
    },
    {
        key: "YELLOW",
        text: "Желтый",
        headerStyle: styles.HeaderWithYellowStatus,
    },
    {
        key: "DONE",
        text: "Выполнено",
        headerStyle: styles.HeaderWithDoneStatus,
    },
    {
        key: "SUSPENDED",
        text: "Приостановлено",
        headerStyle: styles.HeaderWithSuspendedStatus,
    },
    {
        key: "CANCELED",
        text: "Отменено",
        headerStyle: styles.HeaderWithCanceledStatus,
    },
];

export const Menu = {
    LIST: "LIST",
    TABLE: "TABLE",
    TIMELINE: "TIMELINE",
};