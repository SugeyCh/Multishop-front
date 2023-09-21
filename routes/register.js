// const API = 'http://192.168.1.5:3000/register'

export const postUser = async(newUser, apiUrl) => {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {Accept: "application/json", "Content-type": "application/json"},
        body: JSON.stringify(newUser)
    });
    // console.log(res);
    return await res.json();
}