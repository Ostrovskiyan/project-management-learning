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