
import { IP_ADDR } from "./ip-addr";

const URL = `http://${IP_ADDR}:8000/api/`;

export const getUsers = async () => {
    const response = await fetch(`${URL}users`);
    const users = await response.json();
    return users;
}

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