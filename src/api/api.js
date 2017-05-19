import {idGenerator} from "../util/generators";
import moment from "moment";
import {issueStatuses} from "../issues/constants/constants";
export function getUser() {
    return getUsers()[0];
}

export function getUsers() {
    return [{
        name: "johan",
        surname: "doe",
        avatar: "/images/avatars/example.jpg",
        email: "johanDoe@gmail.com",
        id: 1,
    }, {
        name: "albert",
        surname: "ostrovskyi",
        avatar: "/images/avatars/avatar2.jpg",
        email: "ostrovskiyan15@gmail.com",
        id: 2,
    },];
}

let projectGen = idGenerator();

export function createProject(name) {
    return {
        id: projectGen.next().value,
        name,
        status: "YELLOW",
    }
}

let issueGen = idGenerator();

export function createIssueViaApi(name, author, assigned) {
    return {
        id: issueGen.next().value,
        name: name,
        startDate: moment().startOf("day"),
        endDate: moment().startOf("day"),
        creatingDate: moment(),
        status: issueStatuses.ACTIVE.key,
        author,
        assigned,
        subtasks: [],
    }
}