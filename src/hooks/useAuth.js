export const UseAuth = () => {
    const token = localStorage.getItem("token")

    const headers = {
        headers: { auth: token }
    }

    return headers
}