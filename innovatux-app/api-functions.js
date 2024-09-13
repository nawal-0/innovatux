
import { IP_ADDR } from "./ip-addr";

const URL = `http://${IP_ADDR}:8000/api/`;

export const postLogin = async (email, password) => {
    const response = await fetch(`${URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
}

export const logout = async (token) => {
    const response = await fetch(`${URL}logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const message = await response.json();
    return message;
}