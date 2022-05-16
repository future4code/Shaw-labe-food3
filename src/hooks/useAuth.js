export const UseAuth = () =>{
    const token = localStorage.getItem("token")
 
    const headers = {
        Authorization: token
    }
 
    return headers
 }