import axios from "axios"

const getUserInfo = async (id: number, access: string) => {
    const response = await axios.get('/api/user/' + id, { headers: { 'Authorization': 'Bearer ' + access}})
    if(response.status === 200) return response.data
    return false
}

export default getUserInfo