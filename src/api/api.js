export function getUser() {
    localStorage.getItem("token");
    let name = "johan";
    let surname = "doe";
    let avatar = "/images/avatars/example.jpg";
    return {
        name,
        surname,
        avatar
    }
}