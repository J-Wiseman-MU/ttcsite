import React from "react";
import axios from 'axios';

export async function authenticate(username, password) {
    try {
        const response = await axios.post('http://localhost:8000/users/login', { username, password });
        console.log(response.data.out);
        return response.data.out;
    } catch (error) {
        console.error('Error: ', error);
        return false;
    }
}


  