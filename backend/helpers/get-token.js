// helper
export const getToken = (req) => {
    const authToken = req.headers['authorization'];
    
    const token = authToken.split(" ")[1] ? authToken.split(" ")[1] : authToken
    
    return token
}