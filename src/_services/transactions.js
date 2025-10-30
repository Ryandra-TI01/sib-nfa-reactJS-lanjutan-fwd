import API from "../_api";

export const getTransactions = async () => {
    try {
        const response = await API.get('/transactions', {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

export const createTransaction = async (data) => {
    try {
        const response = await API.post('/transactions', data, {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}