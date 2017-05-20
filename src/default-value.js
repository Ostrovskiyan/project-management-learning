import moment from "moment";

export function defaultStore() {
    return {
        profile: {
            token: localStorage.getItem("authToken"),
            user: {
                name: 'albert',
                surname: 'ostrovskyi',
                avatar: '/images/avatars/avatar2.jpg',
                email: 'ostrovskiyan15@gmail.com',
                login: 'alik',
                password: '1234',
                id: 2
            }
        },
        issues: {
            list: [
                {
                    id: 1,
                    name: 'ILP-32',
                    creatingDate: moment('2017-05-20T22:42:54.340Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'albert',
                        surname: 'ostrovskyi',
                        avatar: '/images/avatars/avatar2.jpg',
                        email: 'ostrovskiyan15@gmail.com',
                        login: 'alik',
                        password: '1234',
                        id: 2
                    },
                    executors: [
                        1,
                        3
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-21T21:00:00.000Z'),
                    endDate: moment('2017-05-23T21:00:00.000Z'),
                    projectId: 0
                },
                {
                    id: 2,
                    name: 'BBCMP-64',
                    creatingDate: moment('2017-05-20T22:43:02.745Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'albert',
                        surname: 'ostrovskyi',
                        avatar: '/images/avatars/avatar2.jpg',
                        email: 'ostrovskiyan15@gmail.com',
                        login: 'alik',
                        password: '1234',
                        id: 2
                    },
                    executors: [
                        2
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-23T21:00:00.000Z'),
                    endDate: moment('2017-05-25T21:00:00.000Z'),
                    projectId: 2
                },
                {
                    id: 3,
                    name: 'ILP-128',
                    creatingDate: moment('2017-05-20T22:43:08.647Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'albert',
                        surname: 'ostrovskyi',
                        avatar: '/images/avatars/avatar2.jpg',
                        email: 'ostrovskiyan15@gmail.com',
                        login: 'alik',
                        password: '1234',
                        id: 2
                    },
                    executors: [
                        3
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-23T21:00:00.000Z'),
                    endDate: moment('2017-05-30T21:00:00.000Z'),
                    projectId: 0
                },
                {
                    id: 4,
                    name: 'ILP-256',
                    creatingDate: moment('2017-05-20T22:43:12.788Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'albert',
                        surname: 'ostrovskyi',
                        avatar: '/images/avatars/avatar2.jpg',
                        email: 'ostrovskiyan15@gmail.com',
                        login: 'alik',
                        password: '1234',
                        id: 2
                    },
                    executors: [
                        2
                    ],
                    subtasks: [
                        {
                            name: 'ILP-256-1',
                            id: 0,
                            done: false
                        },
                        {
                            name: 'ILP-256-2',
                            id: 1,
                            done: true
                        }
                    ],
                    startDate: moment('2017-06-03T21:00:00.000Z'),
                    endDate: moment('2017-06-05T21:00:00.000Z'),
                    projectId: 0
                },
                {
                    id: 5,
                    name: 'T-512',
                    creatingDate: moment('2017-05-20T22:43:38.623Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'Linus',
                        surname: 'Torvalds',
                        avatar: '/images/avatars/avatar3.jpg',
                        email: 'windowssucks@gmail.com',
                        login: 'linux',
                        password: '1234',
                        id: 3
                    },
                    executors: [
                        2
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-30T21:00:00.000Z'),
                    endDate: moment('2017-06-05T21:00:00.000Z'),
                    projectId: 1
                },
                {
                    id: 7,
                    name: 'ILP-1024',
                    creatingDate: moment('2017-05-20T22:44:00.411Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'Linus',
                        surname: 'Torvalds',
                        avatar: '/images/avatars/avatar3.jpg',
                        email: 'windowssucks@gmail.com',
                        login: 'linux',
                        password: '1234',
                        id: 3
                    },
                    executors: [
                        3
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-20T21:00:00.000Z'),
                    endDate: moment('2017-05-20T21:00:00.000Z'),
                    projectId: 0
                },
                {
                    id: 9,
                    name: 'ILP-2048',
                    creatingDate: moment('2017-05-20T22:44:35.606Z'),
                    status: 'ACTIVE',
                    author: {
                        name: 'johan',
                        surname: 'doe',
                        avatar: '/images/avatars/example.jpg',
                        email: 'johanDoe@gmail.com',
                        login: 'john',
                        password: '1234',
                        id: 1
                    },
                    executors: [
                        1
                    ],
                    subtasks: [],
                    startDate: moment('2017-05-23T21:00:00.000Z'),
                    endDate: moment('2017-06-04T21:00:00.000Z'),
                    projectId: 0
                }
            ]
        },
        users: {
            list: [
                {
                    name: 'johan',
                    surname: 'doe',
                    avatar: '/images/avatars/example.jpg',
                    email: 'johanDoe@gmail.com',
                    login: 'john',
                    password: '1234',
                    id: 1
                },
                {
                    name: 'albert',
                    surname: 'ostrovskyi',
                    avatar: '/images/avatars/avatar2.jpg',
                    email: 'ostrovskiyan15@gmail.com',
                    login: 'alik',
                    password: '1234',
                    id: 2
                },
                {
                    name: 'Linus',
                    surname: 'Torvalds',
                    avatar: '/images/avatars/avatar3.jpg',
                    email: 'windowssucks@gmail.com',
                    login: 'linux',
                    password: '1234',
                    id: 3
                }
            ]
        },
        projects: {
            list: [
                {
                    id: 0,
                    name: 'ILP',
                    status: 'YELLOW',
                    participants: [
                        2
                    ],
                    startDate: moment('2017-05-17T21:00:00.000Z'),
                    endDate: moment('2017-06-29T21:00:00.000Z')
                },
                {
                    id: 1,
                    name: 'TRACKER',
                    status: 'SUSPENDED',
                    participants: [
                        2
                    ],
                    startDate: moment('2017-05-29T21:00:00.000Z'),
                    endDate: moment('2017-06-10T21:00:00.000Z')
                },
                {
                    id: 2,
                    name: 'BBCMP',
                    status: 'GREEN',
                    participants: [
                        2
                    ],
                    startDate: moment('2017-05-28T21:00:00.000Z'),
                    endDate: moment('2017-06-09T21:00:00.000Z')
                }
            ]
        },
        filters: {
            issueName: ''
        }
    }
}
