export function getUser() {
    let name = "johan";
    let surname = "doe";
    let avatar = "/images/avatars/example.jpg";
    let email = "johanDoe@gmail.com";
    return {
        name,
        surname,
        avatar,
        email
    }
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