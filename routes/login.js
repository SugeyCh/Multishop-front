import url from '../globalFile'

// const API = 'http://192.168.1.5:3000/login'

export const getUsers = async (id_user, apiUrl) => {
    const response = await fetch(`${apiUrl}/${id_user}`);
    const data = await response.json();
    return data;
};

export const postLogin = async(newUser) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {Accept: "application/json", "Content-type": "application/json"},
        body: JSON.stringify(newUser)
    });
    console.log(res);
    return await res.json();
}

export const logout = async (url) => {
    try{
        const res = await fetch(`${url}`);
        const data = await res.json;
        return data;
    }catch(err){
        console.log("Error: ", err)
    }
}