import { IP_ADDR } from "./ip-addr";
import FormData from 'form-data';

const URL = `http://${IP_ADDR}:8000/api/`;
//const URL = `http://${IP_ADDR}/api/`;


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

export const signup = async (first_name, last_name, username, email, password, age, gender) => {
    const response = await fetch(`${URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, username, email, password, age, gender }),
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

export const getThings = async (item, token) => {
    const response = await fetch(`${URL}${item}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
        const data = await response.json();
        return data;
}

export const addPreference = async (preferences, token) => {
    const response = await fetch(`${URL}add/preferences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...preferences }),
    });
    const data = await response.json();
    return data;
}

export const changePassword = async (old_password, new_password, token) => {
    const response = await fetch(`${URL}change/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password, new_password }),
    });
    const message = await response.json();
    return message;
}

export const joinCommunity = async (community_id, token) => {
    const response = await fetch(`${URL}join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ community_id }),
    });
    const message = await response.json();
    return message;
}

export const postMessage = async (content, community_id, token) => {
    const response = await fetch(`${URL}message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content, community_id }),
    });
    const data = await response.json();
    return data;
}

export const postFeed = async (caption, image, token) => {
    const formData = new FormData();

    formData.append('caption', caption);

    // Get the filename and type from the imageUri
    const imageName = image.split('/').pop();
    const imageType = imageName.split('.').pop();

    // Add the image file to the form data
    formData.append('image', {
        uri: image,
        name: imageName,
        type: `image/${imageType}`,  // Example: 'image/jpeg'
    });

    const response = await fetch(`${URL}posts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    const data = await response.json();
    return data;
}

export const postInput = async (date, price, amount, token) => {
    const response = await fetch(`${URL}input`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, price, amount }),
    });
    const data = await response.json();
    return data;
}

export const followUser = async (user_id, token) => {
    const response = await fetch(`${URL}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });
    const message = await response.json();
    return message;
}

export const unfollowUser = async (user_id, token) => {
    const response = await fetch(`${URL}unfollow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });
    const message = await response.json();
    return message;
}

export const likePost = async (post, token) => {
    const response = await fetch(`${URL}like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: post.id }),
    });
    const message = await response.json();
    return message;
}