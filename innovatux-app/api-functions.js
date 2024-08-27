
import { IP_ADDR } from "./ip-addr";

const URL = `http://${IP_ADDR}:8000/api/`;

export const getUsers = async () => {
    const response = await fetch(`${URL}users`);
    const users = await response.json();
    return users;
}