export const getApi = async (apiUrl) => {
    try{
        const response = await fetch(`${apiUrl}`)
        const data = await response.json();
        console.log("status:", response.status, ", Data:", data)
        return data;
    }catch(error){
        console.log(`Error: ${error.message}`);
        console.log('Dirección y puertos incorrectos.', error)
        return data.status(404)
    }
};