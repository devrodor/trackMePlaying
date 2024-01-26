/**
 * 
 * @returns
 */
export const generateAccessToken = async() => {

 
    const endPoint = import.meta.env.VITE_ENDPOINT_URL;  
    const initParams = {
        method: 'POST'
    }

    const conn = await fetch(endPoint, initParams);
    const data = await conn.json();

    return data;            
 
};