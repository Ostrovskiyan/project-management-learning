import {idGenerator} from "../util/generators";
import moment from "moment";
import {issueStatuses} from "../issues/constants/constants";

export function loginViaApi(login, password) {
    let users = getUsers();
    return users.filter(user => user.login === login && user.password === password)[0].id;
}

export function getByToken(token) {
    return getUsers().filter(user => user.id == token)[0];
}

export function getUsers() {
    return [
        {
            name: "johan",
            surname: "doe",
            avatar: "/images/avatars/example.jpg",
            email: "johanDoe@gmail.com",
            login: "john",
            password: "1234",
            id: 1,
        },
        {
            name: "albert",
            surname: "ostrovskyi",
            avatar: "/images/avatars/avatar2.jpg",
            email: "ostrovskiyan15@gmail.com",
            login: "alik",
            password: "1234",
            id: 2,
        },
        {
            name: "Linus",
            surname: "Torvalds",
            avatar: "/images/avatars/avatar3.jpg",
            email: "windowssucks@gmail.com",
            login: "linux",
            password: "1234",
            id: 3,
        },
    ];
}

let projectGen = idGenerator();

export function createProject(name, token) {
    return {
        id: projectGen.next().value,
        name,
        status: "YELLOW",
        participants: [getByToken(token).id],
    }
}

let issueGen = idGenerator();

export function createIssueViaApi(name, author) {
    return {
        id: issueGen.next().value,
        name: name,
        creatingDate: moment(),
        status: issueStatuses.ACTIVE.key,
        author,
        executors: [],
        subtasks: [],
    }
}