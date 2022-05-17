export const UseAuth = () =>{
    const token = localStorage.getItem("token")
 
    const headers = {
        auth: token
    }
 
    return headers
 }